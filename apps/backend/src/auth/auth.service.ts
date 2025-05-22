import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthProvider,
  Lang,
  ERROR_KEYS,
  MESSAGE_KEYS,
  UserRole,
  SysLogLevel,
} from '@amen24/shared';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Response } from 'express';
import { Profile } from 'passport';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from '../profiles/profiles.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { logError } from '../utils/log.util';

@Injectable()
export class AuthService {
  isSecureResponse: boolean;
  bcryptRounds: number;
  jwtAccessMaxAge: number;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.bcryptRounds = Number(this.configService.getOrThrow('ROUNDS'));
    this.jwtAccessMaxAge = Number(
      this.configService.getOrThrow('JWT_ACCESS_MAX_AGE'),
    );
    this.jwtRefreshSecret = this.configService.getOrThrow('JWT_REFRESH_SECRET');
    this.jwtRefreshExpiresIn = this.configService.getOrThrow(
      'JWT_REFRESH_EXPIRES_IN',
    );
    this.isSecureResponse =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';
  }

  async validateLocalUser(
    email: string,
    pass: string,
  ): Promise<Partial<Omit<User, 'password'>>> {
    const user = await this.usersService.findOneWithPassword(email);

    if (!user) throw new UnauthorizedException(ERROR_KEYS.EMAIL_NOT_FOUND);
    if (user.lockUntil && user.lockUntil > new Date())
      throw new UnauthorizedException(ERROR_KEYS.ACCOUNT_LOCKED);

    const match = await bcrypt.compare(pass, user.password as string);

    if (!match) {
      user.failedAttempts += 1;

      if (user.failedAttempts >= 11) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await this.usersService.update(user.id, user);

      await new Promise((resolve) =>
        setTimeout(resolve, user.failedAttempts * 1000),
      );

      throw new UnauthorizedException(ERROR_KEYS.PASSWORD_INVALID);
    }

    user.failedAttempts = 0;
    user.lockUntil = null;

    await this.usersService.update(user.id, user);

    // Emit event when user successfully logs in
    this.eventEmitter.emit('user.login', { email: user.email });

    const { password, ...result } = user;
    return result;
  }

  async validateOAuthUser(oauthProfile: Profile, lang?: Lang) {
    const { id, emails, displayName, provider } = oauthProfile;
    const email = emails?.at(0)?.value;
    if (!email) throw new BadRequestException();

    const user = await this.usersService.findOneByEmailProvider(
      email,
      <AuthProvider>provider,
    );

    if (user) {
      // Emit event when OAuth user logs in
      this.eventEmitter.emit('user.login', { email: user.email });
      return user;
    }

    try {
      const createUserDto: CreateUserDto = {
        email,
        displayName,
        providerId: id,
        provider: provider as AuthProvider,
        uiLang: lang || null,
        progress: {
          lastRead: 'Last Read',
          oldTestament: '',
          newTestament: '',
        },
        roles: [UserRole.MEMBER],
      };

      return this.usersService.create(createUserDto);
    } catch (error) {
      logError(this.eventEmitter, error, {
        context: 'AuthService.validateOAuthUser',
        metadata: { email, provider, profileId: id },
      });

      throw error;
    }
  }

  async loadTokens(user: User, response: Response): Promise<void> {
    const {
      resetPasswordExpires,
      resetPasswordToken,
      password,
      lockUntil,
      failedAttempts,
      providerId,
      ...rest
    } = user;

    const {
      refreshToken: _refreshToken,
      progresses,
      favorites,
      lastLogin,
      createdAt,
      users,
      ...profileRest
    } = user.profile;

    const access_token = this.jwtService.sign({
      ...rest,
      profile: profileRest,
    });

    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        displayName: user.displayName,
        provider: user.provider,
      },
      {
        secret: this.jwtRefreshSecret,
        expiresIn: this.jwtRefreshExpiresIn,
      },
    );

    await this.profilesService.update(user.email, user.provider, {
      refreshToken: await bcrypt.hash(refreshToken, this.bcryptRounds),
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: this.isSecureResponse,
    });

    response.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.jwtAccessMaxAge * 60 * 1000,
      secure: this.isSecureResponse,
    });
  }

  clearTokens(response: Response): void {
    response.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      secure: this.isSecureResponse,
    });

    response.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
      secure: this.isSecureResponse,
    });
  }

  async refreshAccessToken(
    refreshToken: string,
    response: Response,
  ): Promise<void> {
    const payload = this.jwtService.decode(refreshToken);

    if (!payload?.email) {
      throw new UnauthorizedException(ERROR_KEYS.INVALID_REFRESH_TOKEN);
    }

    // Find profile by email
    const profile = await this.profilesService.findOne(payload.email);

    if (!profile || !profile.refreshToken) {
      throw new UnauthorizedException(ERROR_KEYS.PROFILE_NOT_FOUND);
    }

    const isValid = await bcrypt.compare(refreshToken, profile.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException(ERROR_KEYS.INVALID_REFRESH_TOKEN);
    }

    // Get user from profile (we assume there's always one preferred or primary user)
    const user = await this.usersService.findOneByEmailProvider(
      payload.email,
      payload.provider,
    );

    if (!user) throw new UnauthorizedException(ERROR_KEYS.USER_NOT_FOUND);

    const {
      resetPasswordExpires,
      resetPasswordToken,
      password,
      lockUntil,
      failedAttempts,
      providerId,
      ...rest
    } = user;

    const {
      refreshToken: _refreshToken,
      progresses,
      favorites,
      lastLogin,
      createdAt,
      users,
      ...profileRest
    } = user.profile;

    const access_token = this.jwtService.sign({
      ...rest,
      profile: profileRest,
    });

    // Optionally: rotate refresh token
    const { email, displayName, provider } = user;
    const newRefreshToken = this.jwtService.sign(
      { email, displayName, provider },
      {
        secret: this.jwtRefreshSecret,
        expiresIn: this.jwtRefreshExpiresIn,
      },
    );

    // Save new hashed token
    const refreshTokenHash = await bcrypt.hash(
      newRefreshToken,
      this.bcryptRounds,
    );
    await this.profilesService.update(user.email, user.provider, {
      refreshToken: refreshTokenHash,
    });

    response.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: this.isSecureResponse,
    });

    response.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.jwtAccessMaxAge * 60 * 1000,
      secure: this.isSecureResponse,
    });
  }

  async requestPasswordRestore(email: string) {
    const user = await this.usersService.findOneByEmailProvider(
      email,
      AuthProvider.LOCAL,
    );
    if (!user) throw new NotFoundException('User not found');

    // Generate reset token and expiration time
    const resetToken = randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiry
    await this.usersService.update(user.id, user);

    // Send reset email
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const resetLink = `${frontendUrl}/password-restore?token=${resetToken}`;
    await this.mailerService
      .sendMail({
        to: user.email,
        from: 'support@amen24.org',
        subject: 'Password Reset Request',
        text: `Click the following link to restore your password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      })
      .catch((err) => console.error(err));

    return {
      message: MESSAGE_KEYS.PASSWORD_RESET_EMAIL_SENT,
    };
  }
}

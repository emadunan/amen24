import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProvider, Lang, ERROR_KEYS, MESSAGE_KEYS } from '@amen24/shared';
import { UsersService } from '../users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Response } from 'express';
import { Profile } from 'passport';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

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

    if (user) return user;

    const createUserDto: CreateUserDto = {
      email,
      displayName,
      providerId: id,
      provider: provider as AuthProvider,
      uiLang: lang || null,
      bookmark: {
        last_read: 'Last Read',
        old_testament: '',
        new_testament: '',
      },
    };

    return this.usersService.create(createUserDto);
  }

  loadAccessToken(user: User, response: Response): void {
    const { password, ...payload } = user;

    const access_token = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  clearAccessToken(response: Response): void {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
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

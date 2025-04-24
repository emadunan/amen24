import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { MESSAGE_KEYS, UserPrivilege } from '@amen24/shared';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
import { User as UserParam } from "./decorators/user.decorator";

@Controller('auth')
export class AuthController {
  private appUrl: string;
  private adminSiteUrl: string;

  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    this.appUrl = configService.getOrThrow<string>('FRONTEND_URL');
    this.adminSiteUrl = configService.getOrThrow<string>('ADMINSITE_URL');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@UserParam() user: User) {
    return user;
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    await this.authService.refreshAccessToken(refreshToken, res);
    return res.sendStatus(204);
  }

  @Post('local')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: User }, @Res() res: Response) {
    const origin = req.headers.origin;

    if (origin?.includes(this.adminSiteUrl) && ![UserPrivilege.ADMIN || UserPrivilege.MODERATOR].includes(req.user.profile.privilege)) {
      throw new UnauthorizedException(
        `Access restricted: Only content managers and administrators are permitted to log in. If you're interested in volunteering, please contact us at support@amen24.org.`
      );
    }

    await this.authService.loadTokens(req.user, res);
    res.json({ message: MESSAGE_KEYS.LOGGED_IN_SUCCESSFULLY });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user; // This is set by GoogleStrategy after validation

    if (!user) {
      return res.redirect(`${this.appUrl}?error=AuthenticationFailed`);
    }

    // Store JWT token as an HTTP-only cookie
    await this.authService.loadTokens(user, res);

    // Redirect to frontend (no token in URL for better security)
    return res.redirect(this.appUrl);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req, @Res() res) {
    const user = req.user;

    if (!user) {
      return res.redirect(`${this.appUrl}?error=AuthenticationFailed`);
    }

    await this.authService.loadTokens(user, res);

    return res.redirect(this.appUrl);
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res() res: Response) {
    this.authService.clearTokens(res);

    return res.json({ message: MESSAGE_KEYS.LOGGED_OUT_SUCCESSFULLY });
  }
}

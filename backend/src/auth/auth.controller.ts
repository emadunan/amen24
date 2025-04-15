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
import { MESSAGE_KEYS } from '@amen24/shared';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private appUrl: string;
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    this.appUrl = configService.getOrThrow<string>('FRONTEND_URL');
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Redirects to Google for login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user; // This is set by GoogleStrategy after validation

    if (!user) {
      return res.redirect(`${this.appUrl}?error=AuthenticationFailed`);
    }

    // Store JWT token as an HTTP-only cookie
    this.authService.loadTokens(user, res);

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

    this.authService.loadTokens(user, res);

    return res.redirect(this.appUrl);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    this.authService.clearTokens(res);

    return res.json({ message: MESSAGE_KEYS.LOGGED_OUT_SUCCESSFULLY });
  }
}

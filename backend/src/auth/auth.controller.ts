import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private appUrl: string;
  constructor(private authService: AuthService, configService: ConfigService) {
    this.appUrl = configService.getOrThrow<string>("FRONTEND_URL")
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
    this.authService.loadAccessToken(user, res);

    // Redirect to frontend (no token in URL for better security)
    return res.redirect(this.appUrl);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req, @Res() res): Promise<any> {
    const user = req.user;

    if (!user) {
      return res.redirect(`${this.appUrl}?error=AuthenticationFailed`);
    }

    this.authService.loadAccessToken(user, res);

    return res.redirect(this.appUrl);
  }
}

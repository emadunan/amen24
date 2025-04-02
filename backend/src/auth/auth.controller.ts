import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Redirects to Google for login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user; // This is set by GoogleStrategy after validation

    if (!user) {
      return res.redirect('http://localhost:3000?error=AuthenticationFailed');
    }

    // Store JWT token as an HTTP-only cookie
    this.authService.loadAccessToken(user, res);

    // Redirect to frontend (no token in URL for better security)
    return res.redirect('http://localhost:3000');
  }
}

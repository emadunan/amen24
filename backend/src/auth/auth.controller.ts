import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('local-login')
  @HttpCode(200)
  async login(@Req() req, @Res() res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: 'Logged in sucessfully' });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    console.log("Logout endpoint called");

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
      path: '/', // Must match cookie path when set
    });

    return res.json({ message: 'Logged out successfully' });
  }

}

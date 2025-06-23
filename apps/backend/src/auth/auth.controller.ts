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
import { hasPermission, MESSAGE_KEYS, Permission } from '@amen24/shared';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/user.decorator';

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
  findMe(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const isMobile = req.query['mobile'] === 'true';

    const refreshToken = isMobile
      ? req.headers['authorization']?.replace('Bearer ', '')
      : req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    const tokens = await this.authService.refreshAccessToken(refreshToken, res, isMobile);

    if (isMobile) return res.json(tokens);
    return res.sendStatus(204);
  }

  @Post('local')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: User }, @Res() res: Response) {
    const origin = req.headers.origin;

    if (
      origin?.includes(this.adminSiteUrl) &&
      !hasPermission(req.user.profile.roles, Permission.LOGIN_ADMINSITE)
    ) {
      throw new UnauthorizedException(
        `Access restricted: Only content managers and administrators are permitted to log in. If you're interested in volunteering, please contact us at support@amen24.org.`,
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
    const user = req.user;

    console.log('OAuth Callback Query:', req.query);

    if (!user) {
      return res.redirect(`${this.appUrl}?error=AuthenticationFailed`);
    }

    const redirectUri = (req.user as any).redirectUri;
    const isMobile = (req.user as any).isMobile;

    if (isMobile && redirectUri) {
      const tokens = await this.authService.loadTokens(user, undefined, true);
      const { accessToken, refreshToken } = tokens;

      const deepLink = `${redirectUri}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
      return res.redirect(deepLink);
    }

    await this.authService.loadTokens(user, res, false);
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

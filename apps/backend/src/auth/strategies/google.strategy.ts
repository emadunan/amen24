import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const state = req.query.state;
    let redirectUri: string | undefined = undefined;
    let isMobile = false;

    if (state && typeof state === 'string') {
      try {
        const parsed = JSON.parse(decodeURIComponent(state));
        redirectUri = parsed.redirectUri;
        isMobile = parsed.mobile;
      } catch (err) {
        console.error('Failed to parse OAuth state:', err);
      }
    }

    const user = await this.authService.validateOAuthUser(profile);
    if (!user) throw new UnauthorizedException();

    (user as any).redirectUri = redirectUri;
    (user as any).isMobile = isMobile;

    return done(null, user);
  }
}

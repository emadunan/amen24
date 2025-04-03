import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FacebookStratrgy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>("FACEBOOK_APP_ID"),
      clientSecret: configService.getOrThrow<string>("FACEBOOK_APP_SECRET"),
      callbackURL: configService.getOrThrow<string>("FACEBOOK_CALLBACK_URL"),
      profileFields: ['id', 'displayName', 'name', 'emails', 'photos']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    return await this.authService.validateOAuthUser(profile);
  }
}
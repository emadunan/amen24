import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { UserProfile } from '@amen24/shared';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<Partial<UserProfile> | null> {
    const user = await this.usersService.findLocalProfile(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateAccessToken(user: Partial<UserProfile>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}

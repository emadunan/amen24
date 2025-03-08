import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { UserProfile } from '@amen24/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async validateUser(email: string, pass: string): Promise<Partial<UserProfile> | null> {
    const user = await this.usersService.findLocalProfile(email);
    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(pass, user.password as string);
    if (!match) throw new UnauthorizedException();

    const { password, ...result } = user;
    return result;

  }

  async generateAccessToken(user: Partial<UserProfile>) {
    const { password, ...userProfile } = user;

    return {
      access_token: this.jwtService.sign(userProfile),
    };
  }
}

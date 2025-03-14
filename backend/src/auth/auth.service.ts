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
  async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<Omit<UserProfile, "password">>> {
    const user = await this.usersService.findLocalProfile(email);
    if (!user) throw new UnauthorizedException("emailNotFound");

    if (!(await bcrypt.compare(pass, user.password as string))) {
      throw new UnauthorizedException("invalidPassword");
    }

    const { password, ...userProfile } = user;
    return userProfile;
  }

  async generateAccessToken(user: Partial<UserProfile>) {
    const { password, ...userProfile } = user;

    return {
      access_token: this.jwtService.sign(userProfile),
    };
  }
}

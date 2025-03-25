import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<Omit<User, 'password'>>> {
    const user = await this.usersService.findOneWithPassword(email);
    if (!user) throw new UnauthorizedException('emailNotFound');

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException('accountLocked');
    }

    const match = await bcrypt.compare(pass, user.password as string);

    if (!match) {
      if (!user) throw new UnauthorizedException('emailNotFound');
      user.failedAttempts += 1;

      if (user.failedAttempts >= 11) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await this.usersService.update(user.id, user);

      await new Promise((resolve) =>
        setTimeout(resolve, user.failedAttempts * 1000),
      );

      throw new UnauthorizedException('invalidPassword');
    }

    user.failedAttempts = 0;
    user.lockUntil = null;

    await this.usersService.update(user.id, user);

    const { password, ...result } = user;

    return result;
  }

  async generateAccessToken(user: Partial<User>) {
    const { password, ...userProfile } = user;

    return {
      access_token: this.jwtService.sign(userProfile),
    };
  }
}

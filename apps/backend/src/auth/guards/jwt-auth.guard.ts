import { ERROR_KEYS } from '@amen24/shared';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const response = context.switchToHttp().getResponse<Response>();

    if (
      info instanceof TokenExpiredError ||
      info instanceof JsonWebTokenError
    ) {
      // Clear the access_token cookie when the token is expired or invalid
      response.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      throw new UnauthorizedException(ERROR_KEYS.SESSION_EXPIRED);
    }

    if (err || !user) {
      throw err || new UnauthorizedException(ERROR_KEYS.SESSION_NOT_EXIST);
    }

    return user;
  }
}

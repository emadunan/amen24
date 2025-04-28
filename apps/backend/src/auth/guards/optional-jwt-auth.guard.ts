import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token || request.headers?.authorization?.split(' ')[1];

    // If token not exists, skip passport authentication
    if (!token) {
      return true;
    }

    // If token exists, try normal authentication
    try {
      const canActivate = await super.canActivate(context);
      return canActivate as boolean;
    } catch (err) {
      // If token invalid, still allow (treat as guest)
      return true;
    }
  }

  handleRequest<TUser = any>(err: any, user: any, info: any) {
    if (err || info) {
      // On token errors (expired, invalid), ignore and continue as guest
      return null;
    }
    return user;
  }
}

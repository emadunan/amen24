import { Reflector } from '@nestjs/core';
import { hasPermission, Permission } from '@amen24/shared';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions?.length) return true;

    const request = context.switchToHttp().getRequest();
    const roles = request.user?.profile?.roles;

    if (!roles || !Array.isArray(roles)) {
      throw new ForbiddenException('User roles are missing or invalid.');
    }

    for (const permission of requiredPermissions) {
      if (!hasPermission(roles, permission)) {
        throw new ForbiddenException(`Missing permission: ${permission}`);
      }
    }

    return true;
  }
}

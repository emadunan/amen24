import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: keyof UserEntity | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserEntity | undefined = request.user;

    if (!user) return undefined;

    return data ? user[data] : user;
  },
);

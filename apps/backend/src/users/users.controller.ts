import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Res,
  NotImplementedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { ERROR_KEYS, MESSAGE_KEYS, Permission } from '@amen24/shared';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result) return { message: MESSAGE_KEYS.USER_CREATED };

    throw new NotImplementedException(ERROR_KEYS.USER_NOT_CREATED);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.READ_MEMBERS)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('me/password-reset')
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @CurrentUser() reqUser: User,
    @Body() body: { oldPassword: string; newPassword: string },
    @Res() res: Response,
  ) {
    const { oldPassword, newPassword } = body;

    await this.usersService.resetPassword(
      reqUser.email,
      oldPassword,
      newPassword,
    );

    this.authService.clearTokens(res);
    res.json({ message: MESSAGE_KEYS.PASSWORD_UPDATED });
  }

  @Post('password-request')
  async requestRestorePassword(@Body() body: { email: string }) {
    const { email } = body;

    return this.authService.requestPasswordRestore(email);
  }

  @Patch('me/password-restore')
  async restorePassword(@Body() body: { newPassword: string; token: string }) {
    const { newPassword, token } = body;

    return this.usersService.restorePassword(newPassword, token);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

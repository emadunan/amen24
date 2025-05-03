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
import { ProfilesService } from '../profiles/profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { ProgressService } from '../progress/progress.service';
import { ERROR_KEYS, MESSAGE_KEYS } from '@amen24/shared';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password-reset')
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

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result) return { message: MESSAGE_KEYS.USER_CREATED };

    throw new NotImplementedException(ERROR_KEYS.USER_NOT_CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

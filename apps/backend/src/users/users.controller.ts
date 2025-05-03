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
  UnauthorizedException,
  ParseIntPipe,
  NotFoundException,
  NotImplementedException,
  Put,
  Query,
  BadRequestException,
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
import { ApiMessage, ERROR_KEYS, MESSAGE_KEYS } from '@amen24/shared';
import { FavoritesService } from '../favorites/favorites.service';
import { UpdateProfileDto } from '../profiles/dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly progressService: ProgressService,
    private readonly favoritesService: FavoritesService,
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

  @UseGuards(JwtAuthGuard)
  @Put('me/profile')
  async updateProfile(
    @CurrentUser() u: User,
    @Body() body: UpdateProfileDto,
    @Res() res: Response,
  ) {
    // TODO: Use this enpoint for all profile updates -- remove theme and lang endpoints
    const user = await this.profilesService.update(u.email, u.provider, body);

    if (!user) throw new NotImplementedException();

    await this.authService.loadTokens(user, res);
    res.json({ message: MESSAGE_KEYS.USER_PROFILE_UPDATED });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result) return { message: MESSAGE_KEYS.USER_CREATED };

    throw new NotImplementedException(ERROR_KEYS.USER_NOT_CREATED);
  }

  @UseGuards(JwtAuthGuard)
  @Get('progress')
  async getUserLastReadProgress(@CurrentUser() user: User) {
    return this.progressService.getOne(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('progress')
  async updateProgress(
    @CurrentUser() user: User,
    @Body()
    body: {
      id: number;
      profileEmail: string;
      verseId: number;
    },
  ) {
    const { id, profileEmail, verseId } = body;

    if (user.email !== profileEmail)
      throw new UnauthorizedException(ERROR_KEYS.UNAUTHORIZED_ACCESS);

    if (!verseId) throw new NotFoundException();

    return await this.progressService.update(+id, { verseId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('progress/:id')
  removeProgress(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.progressService.delete(id, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorite')
  async getFavorites(@CurrentUser() user: User) {
    return await this.favoritesService.getFavorites(
      user.email,
      user.profile.uiLang,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite')
  createFavorite(
    @CurrentUser() user: User,
    @Body() body: { verseIds: number[] },
  ) {
    const { verseIds } = body;
    return this.favoritesService.addFavoriteToProfile(user.email, verseIds);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorite/:id')
  async deleteFavorite(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiMessage> {
    const result = await this.favoritesService.removeFavorite(user.email, id);

    if (result) return { message: 'removedFromFavorites' };

    throw new NotImplementedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findAllProfiles(@Query() query: any) {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async removePermanently(@CurrentUser() user: User, @Res() res: Response) {
    await this.profilesService.remove(user.email);

    this.authService.clearTokens(res);

    res.json({ message: MESSAGE_KEYS.USER_DELETED });
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateUserProfile(
    @Body() body: UpdateProfileDto,
    @Res() res: Response,
  ) {
    if (!body.email) throw new BadRequestException();

    const user = await this.profilesService.updateUserProfile(body.email, body);
    if (!user) throw new NotImplementedException();

    res.json({ message: MESSAGE_KEYS.USER_PROFILE_UPDATED });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/statistics')
  async getProfileStatistics() {
    return await this.profilesService.getProfileStatistics();
  }
}

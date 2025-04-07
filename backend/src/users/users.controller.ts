import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  Res,
  UnauthorizedException,
  ParseIntPipe,
  NotImplementedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfilesService } from './services/profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User as UserParam } from '../auth/decorators/user.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { BookmarksService } from './services/bookmarks.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly bookmarksService: BookmarksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@UserParam() user: User) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('local-login')
  @HttpCode(200)
  async login(@Req() req, @Res() res: Response) {
    // Set token produced based on user to the http response
    this.authService.loadAccessToken(req.user, res);
    res.json({ message: 'Logged in sucessfully' });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    this.authService.clearAccessToken(res);

    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password-reset')
  async resetPassword(
    @UserParam() reqUser: User,
    @Body() body: { oldPassword: string; newPassword: string },
    @Res() res: Response,
  ) {
    const { oldPassword, newPassword } = body;

    await this.usersService.resetPassword(
      reqUser.email,
      oldPassword,
      newPassword,
    );

    this.authService.clearAccessToken(res);
    res.json({ message: 'passwordUpdated' });
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
  @Patch('me/theme')
  async toggleTheme(@UserParam() u: User, @Res() res: Response) {
    const user = await this.profilesService.toggleTheme(u.email, u.provider);

    this.authService.loadAccessToken(user, res);
    res.json({ message: 'User profile has been successfully updated' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/lang')
  async changeLang(
    @UserParam() u: User,
    @Body() body: any,
    @Res() res: Response,
  ) {
    if (!u) throw new UnauthorizedException();

    const user = await this.profilesService.changeLang(
      u.email,
      u.provider,
      body.uiLang,
    );

    this.authService.loadAccessToken(user, res);
    res.json({ message: 'User profile has been successfully updated' });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      if (user) return { message: 'userCreated' };

      return { message: 'userCreateFailed' };
    } catch (error) {
      throw new NotImplementedException('userCreateFailed');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('bookmark')
  async getUserLastReadBookmark(@UserParam() user: User) {
    return this.bookmarksService.getOne(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bookmark')
  async updateBookmark(
    @UserParam() user: User,
    @Body()
    body: {
      id: number;
      profileEmail: string;
      verseId: number;
    },
  ) {
    const { id, profileEmail, verseId } = body;

    if (user.email !== profileEmail)
      throw new UnauthorizedException('unauthorizedAccess');

    if (!verseId) throw new NotFoundException();

    return await this.bookmarksService.update(+id, { verseId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('bookmark/:id')
  removeBookmark(
    @UserParam() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarksService.delete(id, user.email);
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

  @UseGuards(JwtAuthGuard)
  @Delete('/profile')
  async removePermanently(@UserParam() user: User, @Res() res: Response) {
    await this.profilesService.remove(user.email);

    return this.logout(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

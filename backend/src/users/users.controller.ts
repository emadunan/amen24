import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  HttpCode,
  Res,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfilesService } from './services/profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User as UserParam } from '../auth/decorators/user.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@UserParam() user: User) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('local-login')
  @HttpCode(200)
  async login(@Req() req, @Res() res: Response) {
    const { access_token } = await this.authService.generateAccessToken(
      req.user,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: 'Logged in sucessfully' });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
      path: '/', // Must match cookie path when set
    });

    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/theme')
  async toggleTheme(@UserParam() user: User, @Res() res: Response) {
    const userProfile = await this.profilesService.toggleTheme(user.email);

    const { access_token } = await this.authService.generateAccessToken(
      userProfile!,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: 'User profile has been successfully updated' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/lang')
  async changeLang(
    @UserParam() user: User,
    @Body() body: any,
    @Res() res: Response,
  ) {
    if (!user) throw new UnauthorizedException();

    const updatedUser = await this.profilesService.changeLang(user.email, body.uiLang);

    const { access_token } = await this.authService.generateAccessToken(
      updatedUser!,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: 'User profile has been successfully updated' });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    console.log(createUserDto);

    const existUser = await this.usersService.findOneByEmailProvider(
      createUserDto.email,
      createUserDto.provider,
    );

    if (existUser) throw new ConflictException('userDuplication');

    const profile = await this.profilesService.create({
      email: createUserDto.email,
      uiLang: createUserDto.uiLang,
    });

    await this.profilesService.updateLastLogin(profile.email);

    if (!profile) throw new NotFoundException('profileNotFound');

    await this.usersService.create(createUserDto);

    return res.redirect(307, '/users/local-login');
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

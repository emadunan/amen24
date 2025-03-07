import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Req,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfilesService } from './services/profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UserProfile } from '@amen24/shared';

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
  findMe(@User() user: UserProfile) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('local-login')
  @HttpCode(200)
  async login(@Req() req, @Res() res: Response) {
    const { access_token } = await this.authService.generateAccessToken(req.user);

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
  async toggleTheme(@User() user: UserProfile, @Res() res: Response) {
    const userProfile = await this.profilesService.toggleTheme(user.email);

    const { access_token } = await this.authService.generateAccessToken(userProfile!);

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
  async changeLang(@User() user: UserProfile, @Body() body: any, @Res() res: Response) {
    const userProfile = await this.profilesService.changeLang(user.email, body.lang);

    const { access_token } = await this.authService.generateAccessToken(userProfile!);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: 'User profile has been successfully updated' });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existUser = await this.usersService.findOneByEmailProvider(
      createUserDto.email,
      createUserDto.provider,
    );

    if (existUser) throw new BadRequestException('User duplication');

    const profile = await this.profilesService.create({
      email: createUserDto.email,
    });

    await this.profilesService.updateLastLogin(profile.email);

    if (!profile) throw new NotFoundException('Profile was not found');

    const user = await this.usersService.create(createUserDto);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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

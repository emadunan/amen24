import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Res, BadRequestException, NotImplementedException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MESSAGE_KEYS } from '@amen24/shared';
import { Response } from "express";
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly authService: AuthService
  ) { }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  async getProfileStatistics() {
    return await this.profilesService.getProfileStatistics();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('email') email: string) {
    return this.profilesService.findOne(email);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() body: UpdateProfileDto,
    @Res() res: Response,
  ) {
    if (!body.email) throw new BadRequestException();

    const user = await this.profilesService.updateUserProfile(body.email, body);
    if (!user) throw new NotImplementedException();

    res.json({ message: MESSAGE_KEYS.USER_PROFILE_UPDATED });
  }


  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() u: User,
    @Body() body: UpdateProfileDto,
    @Res() res: Response,
  ) {
    const user = await this.profilesService.update(u.email, u.provider, body);

    if (!user) throw new NotImplementedException();

    await this.authService.loadTokens(user, res);
    res.json({ message: MESSAGE_KEYS.USER_PROFILE_UPDATED });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async remove(@CurrentUser() user: User, @Res() res: Response) {
    await this.profilesService.remove(user.email);

    this.authService.clearTokens(res);

    res.json({ message: MESSAGE_KEYS.USER_DELETED });
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ERROR_KEYS } from '@amen24/shared';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  @Post()
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
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
  @Get('last-read')
  async getUserLastReadProgress(@CurrentUser() user: User) {
    return this.progressService.getOne(user.email);
  }
}

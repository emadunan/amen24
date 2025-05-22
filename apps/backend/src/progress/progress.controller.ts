import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { ERROR_KEYS } from '@amen24/shared';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

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

  @Get('last-read')
  async getUserLastReadProgress(@CurrentUser() user: User) {
    return this.progressService.getOne(user.email);
  }
}

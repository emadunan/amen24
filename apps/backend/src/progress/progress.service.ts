import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { In, Repository } from 'typeorm';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ERROR_KEYS } from '@amen24/shared';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress) private progressRepo: Repository<Progress>,
  ) {}

  async getAll(profileEmail: string) {
    return await this.progressRepo.findBy({
      profile: { email: profileEmail },
    });
  }

  async getOne(profileEmail: string) {
    const lastRead = ['Last Read', 'آخر قراءة'];

    const progress = await this.progressRepo.findOne({
      where: {
        profile: {
          email: profileEmail,
        },
        title: In(lastRead),
      },
      relations: ['verse', 'verse.chapter', 'verse.chapter.book'],
    });

    return progress;
  }

  async create(progressDto: CreateProgressDto) {
    const { title, profileEmail, verseId } = progressDto;

    const progressCount = await this.progressRepo.count({
      where: {
        profile: {
          email: profileEmail,
        },
      },
    });

    if (progressCount >= 1)
      throw new BadRequestException(ERROR_KEYS.PROGRESS_EXCEED_LIMIT);

    const progress = this.progressRepo.create({
      title,
      verse: { id: verseId },
      profile: { email: profileEmail },
    });

    return await this.progressRepo.save(progress);
  }

  async update(id: number, progressDto: UpdateProgressDto) {
    const progress = await this.progressRepo.findOneBy({ id });

    if (!progress) throw new NotFoundException(ERROR_KEYS.PROGRESS_NOT_FOUND);

    Object.assign(progress, { verse: { id: progressDto.verseId } });

    await this.progressRepo.save(progress);

    return await this.progressRepo.findOne({
      where: { id },
      relations: ['verse', 'verse.chapter', 'verse.chapter.book'],
    });
  }

  async delete(id: number, profileEmail: string) {
    const progress = await this.progressRepo.findOneBy({
      id,
      profile: { email: profileEmail },
    });

    if (!progress) throw new NotFoundException(ERROR_KEYS.PROGRESS_NOT_FOUND);

    await this.progressRepo.delete(id);
  }
}

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { UsersService } from './users.service';
import { AuthProvider, ERROR_KEYS } from '@amen24/shared';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profilesRepo: Repository<Profile>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) { }

  async create(createProfileDto: Partial<CreateProfileDto>) {
    const profile = this.profilesRepo.create(createProfileDto);

    return await this.profilesRepo.save(profile);
  }

  async findAll() {
    return await this.profilesRepo.find();
  }

  async findOne(email: string) {
    return await this.profilesRepo.findOneBy({ email });
  }

  async update(
    email: string,
    provider: AuthProvider,
    updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profilesRepo.findOneBy({ email });

    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    Object.assign(profile, updateProfileDto);
    await this.profilesRepo.save(profile);

    return await this.usersService.findOneByEmailProvider(email, provider);
  }

  async remove(email: string) {
    const profile = await this.profilesRepo.findOneBy({ email });
    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    return await this.profilesRepo.remove(profile);
  }

  async getProfileStatistics() {
    const total = await this.profilesRepo.count();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const loggedToday = await this.profilesRepo.count({
      where: {
        lastLogin: Between(todayStart, todayEnd),
      },
    });

    const createdToday = await this.profilesRepo.count({
      where: {
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const uiLanguages = await this.profilesRepo
      .createQueryBuilder('profile')
      .select('profile.uiLang', 'uiLang')
      .addSelect('COUNT(*)', 'count')
      .groupBy('profile.uiLang')
      .getRawMany();

    const themeModes = await this.profilesRepo
      .createQueryBuilder('profile')
      .select('profile.themeMode', 'themeMode')
      .addSelect('COUNT(*)', 'count')
      .groupBy('profile.themeMode')
      .getRawMany();

    const providers = await this.profilesRepo
      .createQueryBuilder('profile')
      .leftJoin('profile.users', 'user')
      .select('user.provider', 'provider')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.provider')
      .getRawMany();

    return {
      users: {
        total,
        loggedInToday: loggedToday,
        createdToday,
      },
      uiLang: uiLanguages.reduce((acc, cur) => {
        acc[cur.uiLang] = Number(cur.count);
        return acc;
      }, {}),
      theme: themeModes.reduce((acc, cur) => {
        acc[cur.themeMode] = Number(cur.count);
        return acc;
      }, {}),
      providers: providers.reduce((acc, cur) => {
        acc[cur.provider] = Number(cur.count);
        return acc;
      }, {}),
    };
  }
}

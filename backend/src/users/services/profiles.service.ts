import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { UsersService } from './users.service';
import { AuthProvider, ERROR_KEYS, Lang, ThemeMode } from '@amen24/shared';
import { User } from '../entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profilesRepo: Repository<Profile>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

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

  async remove(email: string) {
    const profile = await this.profilesRepo.findOneBy({ email });
    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    return await this.profilesRepo.remove(profile);
  }

  async updateLastLogin(email: string) {
    return await this.profilesRepo.update(email, { lastLogin: new Date() });
  }

  async toggleTheme(email: string, provider: AuthProvider): Promise<User> {
    const profile = await this.profilesRepo.findOne({ where: { email } });
    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    profile.themeMode =
      profile.themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    await this.profilesRepo.save(profile);

    const user = await this.usersService.findOneByEmailProvider(
      profile.email,
      provider,
    );

    if (!user) throw new NotFoundException(ERROR_KEYS.USER_NOT_FOUND);

    return user;
  }

  async changeLang(
    email: string,
    provider: AuthProvider,
    uiLang: Lang,
  ): Promise<User> {
    const profile = await this.profilesRepo.findOne({ where: { email } });
    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    profile.uiLang = uiLang;
    await this.profilesRepo.save(profile);

    const user = await this.usersService.findOneByEmailProvider(
      profile.email,
      provider,
    );

    if (!user) throw new NotFoundException(ERROR_KEYS.USER_NOT_FOUND);

    return user;
  }
}

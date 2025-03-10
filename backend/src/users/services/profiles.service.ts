import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { UsersService } from './users.service';
import { Lang, ThemeMode, UserProfile } from '@amen24/shared';

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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} user`;
  }

  async remove(email: string) {
    const profile = await this.profilesRepo.findOneBy({ email });

    if (!profile) throw new NotFoundException('profileNotFound');

    return await this.profilesRepo.remove(profile);
  }

  async updateLastLogin(email: string) {
    return await this.profilesRepo.update(email, { lastLogin: new Date() });
  }

  async toggleTheme(email: string): Promise<Partial<UserProfile> | undefined> {
    const profile = await this.profilesRepo.findOne({ where: { email } });

    if (!profile) {
      throw new Error('profileNotFound');
    }

    profile.themeMode = profile.themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    await this.profilesRepo.save(profile);

    return await this.usersService.findLocalProfile(profile.email);
  }

  async changeLang(
    email: string,
    lang: Lang,
  ): Promise<Partial<UserProfile> | undefined> {
    const profile = await this.profilesRepo.findOne({ where: { email } });

    if (!profile) {
      throw new Error('profileNotFound');
    }

    profile.uilang = lang;
    await this.profilesRepo.save(profile);

    return await this.usersService.findLocalProfile(profile.email);
  }
}

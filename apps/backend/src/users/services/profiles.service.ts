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
import { AuthProvider, ERROR_KEYS } from '@amen24/shared';
import { UpdateProfileDto } from '../dto/update-profile.dto';

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
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profilesRepo: Repository<Profile>,
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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} user`;
  }

  async remove(email: string) {
    const profile = await this.profilesRepo.findOneBy({ email });

    if (!profile) throw new NotFoundException('Profile was not found');

    return await this.profilesRepo.remove(profile);
  }

  async updateLastLogin(email: string) {
    return await this.profilesRepo.update(email, { lastLogin: new Date() });
  }

  async toggleTheme(email: string) {
    const profile = await this.profilesRepo.findOne({ where: { email } });

    if (!profile) {
      throw new Error("User not found");
    }
    
    return await this.profilesRepo.update(email, { darkMode: !profile.darkMode })
  }
}

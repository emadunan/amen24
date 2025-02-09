import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private profilesRepo: Repository<Profile>) { }

  async create(createProfileDto: Partial<CreateProfileDto>) {
    const profile = this.profilesRepo.create(createProfileDto);

    return await this.profilesRepo.save(profile);
  }

  async findAll() {
    const profiles = await this.profilesRepo.find();

    return profiles;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}

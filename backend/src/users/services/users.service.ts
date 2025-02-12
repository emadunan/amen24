import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ProfilesService } from './profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private profilesService: ProfilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepo.create(createUserDto);

    return await this.usersRepo.save(user);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: string) {
    return await this.usersRepo.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }

  async findOneByEmailProvider(email: string, provider: string = 'local') {    
    return await this.usersRepo.findOneBy({ email, provider });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User was not found');

    Object.assign(user, updateUserDto);

    return await this.usersRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User was not found');

    return await this.profilesService.remove(user.email);
  }
}

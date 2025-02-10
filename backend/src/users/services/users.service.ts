import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepo.create(createUserDto);

    return await this.usersRepo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.usersRepo.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

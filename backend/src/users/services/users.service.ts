import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ProfilesService } from './profiles.service';
import { UserProfile } from "@amen24/shared";
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly configService: ConfigService,
    private profilesService: ProfilesService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, provider } = createUserDto;

    let user: Partial<User> | undefined;

    if (provider === "local" && password) {
      const hash = await bcrypt.hash(password, this.configService.getOrThrow<string>("ROUNDS"));

      user = { ...createUserDto, password: hash };

      this.usersRepo.create(user)
    }

    if (!user) throw new BadRequestException("User could not be created");

    return await this.usersRepo.save(user);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: string) {
    return await this.usersRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }

  async findLocalProfile(email: string): Promise<Partial<UserProfile> | undefined> {
    const userProfile = await this.usersRepo.findOne({
      where: { email, provider: "local" },
      relations: ['profile'],
    });

    if (!userProfile) return;

    const { profile, ...user } = userProfile;

    return {
      ...user,
      privilege: userProfile?.profile.privilege,
      createdAt: userProfile?.profile.createdAt,
      lastLogin: userProfile?.profile.lastLogin,
      currentBook: userProfile?.profile.currentBook,
      currentChapter: userProfile?.profile.currentChapter,
      uilanguage: userProfile?.profile.uilanguage,
      fontSize: userProfile?.profile.fontSize,
      diacrited: userProfile?.profile.diacrited,
      darkMode: userProfile?.profile.darkMode,
    };
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

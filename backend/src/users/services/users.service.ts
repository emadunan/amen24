import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ProfilesService } from './profiles.service';
import { AuthProvider } from '@amen24/shared';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly configService: ConfigService,
    private profilesService: ProfilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, provider } = createUserDto;

    let user: Partial<User> | undefined;

    if (provider === AuthProvider.LOCAL && password) {
      const hash = await bcrypt.hash(
        password,
        this.configService.getOrThrow<string>('ROUNDS'),
      );

      user = { ...createUserDto, password: hash };

      this.usersRepo.create(user);
    }

    if (!user) throw new BadRequestException('userNotCreated');

    return await this.usersRepo.save(user);
  }

  async resetPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user || !user.password)
      throw new BadRequestException(
        'No old password has been found, contact system admin to resolve your login via support@amen24.org',
      );

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) throw new UnauthorizedException('unauthorizedAccess');

    const rounds = parseInt(this.configService.getOrThrow<string>('ROUNDS'));

    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('passwordTooShort');
    }

    user.password = await bcrypt.hash(newPassword, rounds);

    return await this.usersRepo.save(user);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOneWithPassword(
    email: string,
    provider: AuthProvider = AuthProvider.LOCAL,
  ) {
    return await this.usersRepo.findOne({
      where: { email, provider },
      relations: ['profile'],
    });
  }

  async findOneById(id: string) {
    return await this.usersRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async findManyByEmail(email: string) {
    const users = await this.usersRepo.find({
      where: { email },
    });

    // TODO: extract password from users before retrieve data

    return users;
  }

  async findOneByEmailProvider(
    email: string,
    provider: AuthProvider = AuthProvider.LOCAL,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepo.findOne({
      where: { email, provider },
      relations: ['profile'],
    });

    if (!user) return null;

    const { password, ...result } = user;

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('userNotFound');

    Object.assign(user, updateUserDto);

    return await this.usersRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('userNotFound');

    return await this.profilesService.remove(user.email);
  }
}

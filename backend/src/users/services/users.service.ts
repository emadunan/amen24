import {
  BadRequestException,
  ConflictException,
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
import { AuthProvider, BookKey } from '@amen24/shared';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { BookmarksService } from './bookmarks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly configService: ConfigService,
    private profilesService: ProfilesService,
    private bookmarksService: BookmarksService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password, provider, uiLang, bookmark } = createUserDto;

    // Check if the user already exists
    const existUser = await this.findOneByEmailProvider(email, provider);
    if (existUser) throw new ConflictException('userDuplication');

    // Create profile
    const profile = await this.profilesService.create({ email, uiLang });
    if (!profile) throw new NotFoundException('profileNotFound');

    // Hash password if local authentication
    const userData: Partial<User> = {
      ...createUserDto,
      ...(provider === AuthProvider.LOCAL && password
        ? { password: await this.hashPassword(password) }
        : {}),
    };

    // Save user
    const userToCreate = this.usersRepo.create(userData);
    const user = await this.usersRepo.save(userToCreate);

    // Default bookmark
    const bookmarkExist = this.bookmarksService.getOne(email);

    if (bookmark?.last_read && !bookmarkExist) {
      const defaultBookmarks = [
        {
          title: bookmark.last_read,
          bookKey: '01_GEN' as BookKey,
          chapterNo: 1,
          verseNo: 1,
        },
      ];

      for (const bm of defaultBookmarks) {
        await this.bookmarksService.create({ profileEmail: email, ...bm });
      }
    }

    delete user.password;

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.getOrThrow<string>('ROUNDS');
    return bcrypt.hash(password, rounds);
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

  async restorePassword(newPassword: string, token: string) {
    const user = await this.usersRepo.findOne({
      where: { resetPasswordToken: token },
    });

    if (
      !user ||
      !user.resetPasswordExpires ||
      new Date() > user.resetPasswordExpires
    ) {
      throw new BadRequestException('invalidOrExpiredToken');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.usersRepo.save(user);

    return { message: 'Password has been successfully reset' };
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

    return users;
  }

  async findOneByEmailProvider(
    email: string,
    provider: AuthProvider = AuthProvider.LOCAL,
  ): Promise<User | null> {
    const user = await this.usersRepo.findOne({
      where: { email, provider },
      relations: ['profile'],
    });

    if (!user) return null;

    return user;
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

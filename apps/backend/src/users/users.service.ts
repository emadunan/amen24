import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { AuthProvider, ERROR_KEYS, MESSAGE_KEYS, SysLogLevel } from '@amen24/shared';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ProgressService } from '../progress/progress.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { logError } from 'src/utils/log.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly configService: ConfigService,
    private profilesService: ProfilesService,
    private progressService: ProgressService,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password, provider, uiLang, progress, roles } = createUserDto;

    if (password && password.length < 4)
      throw new BadRequestException(ERROR_KEYS.PASSWORD_TOO_SHORT);

    // Check if the user already exists
    const existUser = await this.findOneByEmailProvider(email, provider);
    if (existUser) throw new ConflictException(ERROR_KEYS.USER_DUPLICATION);

    // Create profile
    try {
      const profile = await this.profilesService.create({ email, uiLang, roles });
      if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);
    } catch (error) {
      logError(this.eventEmitter, error, {
        context: 'UsersService.create',
        metadata: { email, provider },
      });

      throw error;
    }

    // Hash password if local authentication
    const userData: Partial<User> = {
      ...createUserDto,
      ...(provider === AuthProvider.LOCAL && password
        ? { password: await this.hashPassword(password) }
        : {}),
    };

    // Save user
    const userToCreate = this.usersRepo.create(userData);
    await this.usersRepo.save(userToCreate);

    // Default progress
    const progressExist = await this.progressService.getOne(email);

    if (progress?.lastRead && !progressExist) {
      const defaultProgress = [
        {
          title: progress.lastRead,
          verseId: 1,
        },
      ];

      for (const bm of defaultProgress) {
        await this.progressService.create({ profileEmail: email, ...bm });
      }
    }

    // Include profile in the returned user
    const user = await this.findOneByEmailProvider(email, provider);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.getOrThrow<string>('ROUNDS');
    return bcrypt.hash(password, rounds);
  }

  async resetPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email, provider: AuthProvider.LOCAL },
      relations: ['profile'],
    });

    if (!user || !user.password)
      throw new BadRequestException(ERROR_KEYS.NO_OLD_PASSWORD_FOUND);

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) throw new UnauthorizedException(ERROR_KEYS.UNAUTHORIZED_ACCESS);

    const rounds = parseInt(this.configService.getOrThrow<string>('ROUNDS'));

    if (!newPassword || newPassword.length < 4) {
      throw new BadRequestException(ERROR_KEYS.PASSWORD_TOO_SHORT);
    }

    user.password = await bcrypt.hash(newPassword, rounds);

    this.eventEmitter.emit('user.resetPassword', { email });

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
      throw new BadRequestException(ERROR_KEYS.INVALID_OR_EXPIRED_TOKEN);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.usersRepo.save(user);

    return { message: MESSAGE_KEYS.PASSWORD_UPDATED };
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOneWithPassword(email: string) {
    return await this.usersRepo.findOne({
      where: { email, provider: AuthProvider.LOCAL },
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
      relations: ['profile', 'profile.progresses'],
    });

    if (!user) return null;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(ERROR_KEYS.USER_NOT_FOUND);

    Object.assign(user, updateUserDto);

    return await this.usersRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(ERROR_KEYS.USER_NOT_FOUND);

    return await this.profilesService.remove(user.email);
  }
}

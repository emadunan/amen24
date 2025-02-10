import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfilesService } from './services/profiles.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly profilesService: ProfilesService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const profile = await this.profilesService.create({ "email": createUserDto.email });

    await this.profilesService.updateLastLogin(profile.email);

    if (!profile) throw new NotFoundException("Profile was not found");

    try {
      const user = await this.usersService.create(createUserDto);

      return user;
    } catch (error) {
      console.log(error);
      
      throw new BadRequestException("User duplication")
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

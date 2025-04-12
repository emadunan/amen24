import { Injectable } from '@nestjs/common';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { UpdateFeaturedDto } from './dto/update-featured.dto';

@Injectable()
export class FeaturedService {
  create(createFeaturedDto: CreateFeaturedDto) {
    return 'This action adds a new featured';
  }

  findAll() {
    return `This action returns all featured`;
  }

  findOne(id: number) {
    return `This action returns a #${id} featured`;
  }

  update(id: number, updateFeaturedDto: UpdateFeaturedDto) {
    return `This action updates a #${id} featured`;
  }

  remove(id: number) {
    return `This action removes a #${id} featured`;
  }
}

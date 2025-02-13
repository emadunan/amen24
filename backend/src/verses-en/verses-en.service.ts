import { Injectable } from '@nestjs/common';
import { CreateVersesEnDto } from './dto/create-verse-en.dto';
import { UpdateVersesEnDto } from './dto/update-verse-en.dto';

@Injectable()
export class VersesEnService {
  create(createVersesEnDto: CreateVersesEnDto) {
    return 'This action adds a new versesEn';
  }

  findAll() {
    return `This action returns all versesEn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versesEn`;
  }

  update(id: number, updateVersesEnDto: UpdateVersesEnDto) {
    return `This action updates a #${id} versesEn`;
  }

  remove(id: number) {
    return `This action removes a #${id} versesEn`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateVersesArDto } from './dto/create-verse-ar.dto';
import { UpdateVersesArDto } from './dto/update-verse-ar.dto';

@Injectable()
export class VersesArService {
  create(createVersesArDto: CreateVersesArDto) {
    return 'This action adds a new versesAr';
  }

  findAll() {
    return `This action returns all versesAr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versesAr`;
  }

  update(id: number, updateVersesArDto: UpdateVersesArDto) {
    return `This action updates a #${id} versesAr`;
  }

  remove(id: number) {
    return `This action removes a #${id} versesAr`;
  }
}

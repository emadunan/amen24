import { Injectable } from '@nestjs/common';
import { CreateVersesNativeDto } from './dto/create-verse-native.dto';
import { UpdateVersesNativeDto } from './dto/update-verse-native.dto';

@Injectable()
export class VersesNativeService {
  create(createVersesNativeDto: CreateVersesNativeDto) {
    return 'This action adds a new versesNative';
  }

  findAll() {
    return `This action returns all versesNative`;
  }

  findOne(id: number) {
    return `This action returns a #${id} versesNative`;
  }

  update(id: number, updateVersesNativeDto: UpdateVersesNativeDto) {
    return `This action updates a #${id} versesNative`;
  }

  remove(id: number) {
    return `This action removes a #${id} versesNative`;
  }
}

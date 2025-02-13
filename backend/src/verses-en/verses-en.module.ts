import { Module } from '@nestjs/common';
import { VersesEnService } from './verses-en.service';
import { VersesEnController } from './verses-en.controller';

@Module({
  controllers: [VersesEnController],
  providers: [VersesEnService],
})
export class VersesEnModule {}

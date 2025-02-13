import { Module } from '@nestjs/common';
import { VersesNativeService } from './verses-native.service';
import { VersesNativeController } from './verses-native.controller';

@Module({
  controllers: [VersesNativeController],
  providers: [VersesNativeService],
})
export class VersesNativeModule {}

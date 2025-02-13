import { Module } from '@nestjs/common';
import { VersesArService } from './verses-ar.service';
import { VersesArController } from './verses-ar.controller';

@Module({
  controllers: [VersesArController],
  providers: [VersesArService],
})
export class VersesArModule {}

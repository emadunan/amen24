import { Module } from '@nestjs/common';
import { AuditingService } from './auditing.service';
import { AuditingController } from './auditing.controller';

@Module({
  controllers: [AuditingController],
  providers: [AuditingService],
})
export class AuditingModule {}

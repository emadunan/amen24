import { Module } from '@nestjs/common';
import { AuditingService } from './auditing.service';
import { AuditingController } from './auditing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditing } from './entities/auditing.entity';
import { AuditListener } from './auditing.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Auditing])],
  controllers: [AuditingController],
  providers: [AuditingService, AuditListener],
  exports: [AuditingService],
})
export class AuditingModule {}

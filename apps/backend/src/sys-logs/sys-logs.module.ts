import { Module } from '@nestjs/common';
import { SysLogsService } from './sys-logs.service';
import { SysLogsController } from './sys-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysLog } from './entities/sys-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysLog])],
  controllers: [SysLogsController],
  providers: [SysLogsService],
})
export class SysLogsModule { }

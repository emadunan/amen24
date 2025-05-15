import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SysLogsService } from './sys-logs.service';
import { CreateSysLogDto } from './dto/create-sys-log.dto';

@Injectable()
export class SysLogsListener {
  constructor(private readonly sysLogsService: SysLogsService) {}

  @OnEvent('sys-log')
  async handleSysLog(payload: CreateSysLogDto) {
    await this.sysLogsService.create(payload);
  }
}

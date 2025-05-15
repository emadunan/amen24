import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SysLogsService } from './sys-logs.service';
import { CreateSysLogDto } from './dto/create-sys-log.dto';
import { UpdateSysLogDto } from './dto/update-sys-log.dto';

@Controller('sys-logs')
export class SysLogsController {
  constructor(private readonly sysLogsService: SysLogsService) {}

  @Post()
  create(@Body() createSysLogDto: CreateSysLogDto) {
    return this.sysLogsService.create(createSysLogDto);
  }

  @Get()
  findAll() {
    return this.sysLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysLogDto: UpdateSysLogDto) {
    return this.sysLogsService.update(+id, updateSysLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysLogsService.remove(+id);
  }
}

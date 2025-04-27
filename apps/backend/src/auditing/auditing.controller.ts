import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditingService } from './auditing.service';
import { CreateAuditingDto } from './dto/create-auditing.dto';

@Controller('auditing')
export class AuditingController {
  constructor(private readonly auditingService: AuditingService) {}

  @Post()
  recordEvent(@Body() createAuditingDto: CreateAuditingDto) {
    return this.auditingService.recordEvent(createAuditingDto);
  }

  @Get()
  findAll() {
    return this.auditingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditingService.findOne(+id);
  }
}

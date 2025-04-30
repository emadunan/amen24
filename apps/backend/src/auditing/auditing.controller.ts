import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuditingService } from './auditing.service';
import { CreateAuditingDto } from './dto/create-auditing.dto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('auditing')
export class AuditingController {
  constructor(private readonly auditingService: AuditingService) { }

  @Post()
  recordEvent(@Body() createAuditingDto: CreateAuditingDto) {
    return this.auditingService.recordEvent(createAuditingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.auditingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditingService.findOne(+id);
  }
}

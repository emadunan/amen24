import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditingService } from './auditing.service';
import { CreateAuditingDto } from './dto/create-auditing.dto';
import { UpdateAuditingDto } from './dto/update-auditing.dto';

@Controller('auditing')
export class AuditingController {
  constructor(private readonly auditingService: AuditingService) {}

  @Post()
  create(@Body() createAuditingDto: CreateAuditingDto) {
    return this.auditingService.create(createAuditingDto);
  }

  @Get()
  findAll() {
    return this.auditingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditingDto: UpdateAuditingDto) {
    return this.auditingService.update(+id, updateAuditingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditingService.remove(+id);
  }
}

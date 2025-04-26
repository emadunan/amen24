import { Injectable } from '@nestjs/common';
import { CreateAuditingDto } from './dto/create-auditing.dto';
import { UpdateAuditingDto } from './dto/update-auditing.dto';

@Injectable()
export class AuditingService {
  create(createAuditingDto: CreateAuditingDto) {
    return 'This action adds a new auditing';
  }

  findAll() {
    return `This action returns all auditing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditing`;
  }

  update(id: number, updateAuditingDto: UpdateAuditingDto) {
    return `This action updates a #${id} auditing`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditing`;
  }
}

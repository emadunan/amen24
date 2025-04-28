import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAuditingDto } from './dto/create-auditing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auditing } from './entities/auditing.entity';

@Injectable()
export class AuditingService {
  constructor(@InjectRepository(Auditing) private auditingRepo: Repository<Auditing>) { }

  recordEvent(auditingDto: CreateAuditingDto) {    
    const auditingRecord = this.auditingRepo.create(auditingDto);
    this.auditingRepo.save(auditingRecord);
  }

  findAll() {
    return this.auditingRepo.find({ take: 100 });
  }

  findOne(id: number) {
    return this.auditingRepo.findOneBy({ id });
  }
}

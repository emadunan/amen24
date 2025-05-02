import { LessThan, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAuditingDto } from './dto/create-auditing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auditing } from './entities/auditing.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AuditingService {
  constructor(@InjectRepository(Auditing) private auditingRepo: Repository<Auditing>) { }

  recordEvent(auditingDto: CreateAuditingDto) {
    const auditingRecord = this.auditingRepo.create(auditingDto);
    this.auditingRepo.save(auditingRecord);
  }

  findAll() {
    return this.auditingRepo.find({ take: 100, order: { createdAt: "DESC" } });
  }

  findOne(id: number) {
    return this.auditingRepo.findOneBy({ id });
  }

  @Cron('0 3 * * *')
  async cleanupOldAuditingRecords() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await this.auditingRepo.delete({
      createdAt: LessThan(sevenDaysAgo),
    });

    console.log(`🧹 Deleted ${result.affected} audit records older than 7 days`);
  }
}

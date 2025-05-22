import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSysLogDto } from './dto/create-sys-log.dto';
import { UpdateSysLogDto } from './dto/update-sys-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SysLog } from './entities/sys-log.entity';
import { LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SysLogsService {
  constructor(
    @InjectRepository(SysLog) private sysLogRepo: Repository<SysLog>,
  ) {}

  async create(sysLogDto: CreateSysLogDto) {
    const sysLog = this.sysLogRepo.create(sysLogDto);

    return this.sysLogRepo.save(sysLog);
  }

  async findAll() {
    return await this.sysLogRepo.find();
  }

  async findOne(id: number) {
    return await this.sysLogRepo.findOneBy({ id });
  }

  async update(id: number, sysLogDto: UpdateSysLogDto) {
    const sysLog = await this.sysLogRepo.findOneBy({ id });

    if (!sysLog) throw new NotFoundException();

    Object.assign(sysLog, sysLogDto);
    return await this.sysLogRepo.save(sysLog);
  }

  async remove(id: number) {
    return this.sysLogRepo.delete(id);
  }

  @Cron('0 3 * * *')
  async cleanupOldAuditingRecords() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await this.sysLogRepo.delete({
      createdAt: LessThan(sevenDaysAgo),
    });

    console.log(
      `🧹 Deleted ${result.affected} system log records older than 7 days`,
    );
  }
}

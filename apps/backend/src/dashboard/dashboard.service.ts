import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DashboardService {
  constructor(@InjectRepository(Dashboard) private dashboardRepo: Repository<Dashboard>) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleNewDay() {
    const today = new Date().toISOString().split('T')[0];

    const exists = await this.dashboardRepo.findOne({ where: { date: today } });

    if (!exists) {
      const dashboard = this.dashboardRepo.create({ date: today });
      await this.dashboardRepo.save(dashboard);
      console.log(`Dashboard record created for ${today}`);
    }
  }

  private async getTodayDashboard(): Promise<Dashboard> {
    const today = new Date().toISOString().split('T')[0];

    let dashboard = await this.dashboardRepo.findOne({ where: { date: today } });

    if (!dashboard) {
      dashboard = this.dashboardRepo.create({ date: today });
      await this.dashboardRepo.save(dashboard);
    }

    return dashboard;
  }

  async incrementVisits() {
    const dashboard = await this.getTodayDashboard();
    dashboard.visits += 1;
    await this.dashboardRepo.save(dashboard);
  }

  async incrementSearchCount() {
    const dashboard = await this.getTodayDashboard();
    dashboard.searchCount += 1;
    await this.dashboardRepo.save(dashboard);
  }

  async incrementBibleAccess() {
    const dashboard = await this.getTodayDashboard();
    dashboard.bibleAccessCount += 1;
    await this.dashboardRepo.save(dashboard);
  }
}

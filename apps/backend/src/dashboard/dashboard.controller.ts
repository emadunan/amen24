import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('increment-visit')
  @HttpCode(HttpStatus.NO_CONTENT)
  async incrementVisit() {
    await this.dashboardService.incrementVisits();
  }

  @Post('increment-bible-access')
  @HttpCode(HttpStatus.NO_CONTENT)
  async incrementBibleAccess() {
    await this.dashboardService.incrementBibleAccess();
  }
}

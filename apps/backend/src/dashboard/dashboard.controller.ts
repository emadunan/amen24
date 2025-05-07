import { Controller, Post, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Permission } from '@amen24/shared';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.READ_DASHBOARD)
  async getOneDashboard() {
    return await this.dashboardService.getTodayDashboard();
  }

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

import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return req.user;
  }


  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  @HttpCode(200)
  async logout(@Request() req) {
    return req.logout();
  }

}

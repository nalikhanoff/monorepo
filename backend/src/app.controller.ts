import { Controller, Get, Query, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(@Query('login') login: string) {
    return this.appService.getUser(login);
  }

  @Delete()
  deleteUser(@Query('login') login: string) {
    return this.appService.deleteUser(login);
  }
}

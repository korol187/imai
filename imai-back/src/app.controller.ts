import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(@Query('query') query) {
    return this.appService.getUsers(query);
  }

  @Get('feed')
  getFeed(@Query('url') url) {
    return this.appService.getFeed(url);
  }

  @Get('contacts')
  getContacts(@Query('url') url) {
    return this.appService.getContacts(url);
  }


}

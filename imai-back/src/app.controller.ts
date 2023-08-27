import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsCheck } from './paramsCheck.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(@Query('query') query, @ParamsCheck('query') params) {
    return this.appService.getUsers(query);
  }

  @Get('feed')
  getFeed(@Query('url') url, @ParamsCheck('url') params) {
    return this.appService.getFeed(url);
  }

  @Get('contacts')
  getContacts(@Query('url') url, @ParamsCheck('url') params) {
    return this.appService.getContacts(url);
  }

}

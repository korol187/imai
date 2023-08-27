import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { AppService } from './app.service';
import { ParamsCheck } from './paramsCheck.decorator';

@Controller()
@UseInterceptors(CacheInterceptor)
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

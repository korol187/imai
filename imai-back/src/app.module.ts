import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomHttpService } from './customHttp.service'


@Module({
  imports: [
    CacheModule.register(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  controllers: [AppController],
  providers: [AppService, CustomHttpService],
})
export class AppModule {}

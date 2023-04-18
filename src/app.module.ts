import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebtoonModule } from './webtoon/webtoon.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './ormconfig';

@Module({
  imports: [
    WebtoonModule,
    TypeOrmModule.forRoot(config)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

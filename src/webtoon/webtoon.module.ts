import { Module } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { WebtoonEntity } from './entities/webtoon.entity';

import { WebtoonController } from './webtoon.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    WebtoonEntity,
  ]),
],
  controllers: [
    WebtoonController,
  ],
  providers: [
    WebtoonService,
  ]
})
export class WebtoonModule {}

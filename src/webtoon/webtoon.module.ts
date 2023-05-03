import { Module } from '@nestjs/common';
import { EpisodeService, WebtoonService } from './webtoon.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { WebtoonEntity } from './entities/webtoon.entity';
import { EpisodeEntity } from './entities/episode.entity';

import { WebtoonController } from './webtoon.controller';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    WebtoonEntity,
    EpisodeEntity,
    CommentEntity
  ]),
],
  controllers: [
    WebtoonController,
  ],
  providers: [
    WebtoonService,
    EpisodeService
  ]
})
export class WebtoonModule {}

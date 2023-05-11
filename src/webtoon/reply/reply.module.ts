import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity } from '../entities/reply.entity';
import { CommentModule } from '../comment/comment.module';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { WebtoonService } from '../webtoon.service';
import { WebtoonEntity } from '../entities/webtoon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ReplyEntity,
        CommentEntity,
        WebtoonEntity
    ]),
    CommentModule
  ],
  controllers: [ReplyController],
  providers: [ReplyService, CommentService, WebtoonService]
})

export class ReplyModule {}

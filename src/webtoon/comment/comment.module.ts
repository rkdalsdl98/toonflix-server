import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { WebtoonService } from '../webtoon.service';
import { WebtoonModule } from '../webtoon.module';
import { WebtoonEntity } from '../entities/webtoon.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity,
            WebtoonEntity
        ]),
        WebtoonModule
    ],
    controllers: [
        CommentController,
    ],
    providers: [
        CommentService,
        WebtoonService
    ]
})
export class CommentModule {}

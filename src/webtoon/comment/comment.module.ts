import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity,
        ])
    ],
    controllers: [
        CommentController,
    ],
    providers: [
        CommentService
    ]
})
export class CommentModule {}

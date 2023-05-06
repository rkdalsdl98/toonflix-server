import { Controller, Get, Post, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService : CommentService) {}

    @Get('/:webtoonId/all')
    async getAllComments(@Param('webtoonId') webtoonId : string) : Promise<CommentEntity[] | null> {
        return this.commentService.getAllComments(webtoonId)
    }
}
import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { CommentDto } from '../dto/comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService : CommentService) {
        this.commentService.checkNeedClearingComments()
    }

    @Post('add')
    async addComment(@Body() commentData : any) : Promise<void> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const wrap : CommentDto = {
            "comment_text": commentData.comment_text,
            "owner": commentData.owner,
            "owner_id": parseInt(commentData.owner_id),
            "webtoon_id": commentData.webtoon_id,
            "uptime": commentData.uptime,
            "day": day
        }
        return this.commentService.addComment(wrap)
    }

    @Get('/:webtoonId/all')
    async getAllComments(@Param('webtoonId') webtoonId : string) : Promise<CommentEntity[] | null> {
        return this.commentService.getAllComments(webtoonId)
    }

    @Patch('like/increase/:commentId')
    async increaseLikeCount(@Param('commentId') commentId : string) : Promise<void> {
        return this.commentService.increaseCommentLikeCount(commentId)
    }
}
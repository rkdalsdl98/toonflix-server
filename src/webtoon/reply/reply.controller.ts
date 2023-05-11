import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyEntity } from '../entities/reply.entity';
import { ReplyDto } from '../dto/reply.dto';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService : ReplyService){}

    @Get('all/:commentId')
    async getAllReplyByPId(@Param('commentId') commentId : string) : Promise<ReplyEntity[] | null> {
        return this.replyService.getAllReplyByPId(parseInt(commentId))
    }

    @Post('add')
    async addReply(@Body() replyData : ReplyDto) : Promise<void> {
        return this.replyService.addReply(replyData)
    }
}

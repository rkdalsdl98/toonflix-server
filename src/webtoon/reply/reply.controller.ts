import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyEntity } from '../entities/reply.entity';
import { ReplyDto } from '../dto/reply.dto';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService : ReplyService){
        this.replyService.checkNeedClearingReplys()
    }

    @Get('all/:commentId')
    async getAllReplyByPId(@Param('commentId') commentId : string) : Promise<ReplyEntity[] | null> {
        return this.replyService.getAllReplyByPId(parseInt(commentId))
    }

    @Post('add')
    async addReply(@Body() replyData : any) : Promise<void> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const wrap : ReplyDto = {
            "comment_id": replyData.comment_id,
            "reply_text": replyData.reply_text,
            "owner": replyData.owner,
            "owner_id": replyData.owner_id,
            "uptime": replyData.uptime,
            "day": day
        }
        return this.replyService.addReply(wrap)
    }
}

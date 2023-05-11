import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReplyEntity } from '../entities/reply.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentService } from '../comment/comment.service';
import { ReplyDto } from '../dto/reply.dto';

@Injectable()
export class ReplyService {
    constructor(
        @InjectRepository(ReplyEntity)
        private readonly replyRepository : Repository<ReplyEntity>,
        private readonly commentService : CommentService
    ){}

    async getAllReplyByPId(commentId : number) : Promise<ReplyEntity[] | null> {
        return await this.replyRepository.findBy({comment_id: commentId})
    }

    async addReply(replyData : ReplyDto) : Promise<void> {
        await this.replyRepository.createQueryBuilder()
        .insert()
        .into(ReplyEntity,[
            'comment_id',
            'reply_text',
            'owner',
            'owner_id',
            'uptime'
        ])
        .values({
            comment_id: parseInt(replyData.comment_id),
            reply_text: replyData.reply_text,
            owner: replyData.owner,
            owner_id: parseInt(replyData.owner_id),
            uptime: replyData.uptime
        })
        .execute()

        await this.commentService.increaseCommentReplyCount(replyData.comment_id)
    }
}

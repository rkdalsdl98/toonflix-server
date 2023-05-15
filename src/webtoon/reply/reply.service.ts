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
            'uptime',
            'day'
        ])
        .values({
            comment_id: parseInt(replyData.comment_id),
            reply_text: replyData.reply_text,
            owner: replyData.owner,
            owner_id: parseInt(replyData.owner_id),
            uptime: replyData.uptime,
            day: replyData.day
        })
        .execute()

        await this.commentService.increaseCommentReplyCount(replyData.comment_id)
    }

    /**********내부용**********/
    async checkNeedClearingReplys() : Promise<void> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const reply : ReplyEntity | null = await this.replyRepository.findOneBy({id: 1})
        if(reply === null || reply.day !== day) {
            await this.replyRepository.clear()
            console.log('답글 기록 초기화 성공')
        }
    }
}

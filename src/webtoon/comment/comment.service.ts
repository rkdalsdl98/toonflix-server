import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from '../dto/comment.dto';
import { WebtoonService } from '../webtoon.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository : Repository<CommentEntity>,
        private readonly webtoonService : WebtoonService
        ) {}

    async getAllComments(webtoonId : string) : Promise<CommentEntity[] | null> {
        return await this.commentRepository.findBy({webtoon_id: webtoonId})
    }

    async addComment(commentData : CommentDto) : Promise<void> {
        await this.commentRepository.createQueryBuilder()
        .insert()
        .into(CommentEntity,[
            'comment_text',
            'owner',
            'owner_id',
            'webtoon_id',
            'uptime',
            'day'
        ])
        .values(commentData)
        .execute()

        await this.webtoonService.increaseCommentCount(commentData.webtoon_id)
    }

    async increaseCommentLikeCount(commentId : string) : Promise<void> {
        await this.commentRepository.createQueryBuilder()
        .update(CommentEntity)
        .set({
            like_count: () => 'like_count + 1'
        })
        .where('id = :commentId', {commentId: parseInt(commentId)})
        .execute()
    }

    async increaseCommentReplyCount(commentId : string) : Promise<void> {
        await this.commentRepository.createQueryBuilder()
        .update(CommentEntity)
        .set({
            reply_count: () => 'reply_count + 1'
        })
        .where('id = :commentId', {commentId: parseInt(commentId)})
        .execute()
    }

    /**********내부용**********/
    async checkNeedClearingComments() : Promise<void> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const comment : CommentEntity | null = await this.commentRepository.findOneBy({id: 1})
        if(comment === null || comment.day !== day) {
            await this.commentRepository.clear()
            console.log('댓글 기록 초기화 성공')
        }
    }
}

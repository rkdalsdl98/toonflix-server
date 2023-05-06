import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository : Repository<CommentEntity>
        ) {}

    async getAllComments(webtoonId : string) : Promise<CommentEntity[] | null> {
        return await this.commentRepository.findBy({webtoon_id: webtoonId})
    }
}

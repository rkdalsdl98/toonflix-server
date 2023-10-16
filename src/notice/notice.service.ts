import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeEntity } from './entities/notice.entity';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(NoticeEntity)
        private noticeRepository : Repository<NoticeEntity>,
    ) {
    }

    async getNotice() : Promise<NoticeEntity[] | null> {
        return this.noticeRepository.find()
    }

    async addNotice(identifierCode : string, notice : NoticeDto) : Promise<void> {
        const now = new Date
        const updateAt = `${now.getFullYear()}-${`${now.getMonth()}`.padStart(2, '0')}-${`${now.getDate()}`.padStart(2, '0')}`

        const updateAtNotice = {
            ...notice,
            updateAt
        }
        this.noticeRepository.createQueryBuilder()
        .insert()
        .into(NoticeEntity, [
            'title',
            'content',
            'imageUrl',
            'category',
            'updateAt',
        ])
        .values(updateAtNotice)
        .execute()
    }
}

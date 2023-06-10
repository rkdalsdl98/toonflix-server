import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        
    }
}

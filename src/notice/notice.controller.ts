import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeEntity } from './entities/notice.entity';

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Get('list')
    async getNotices() : Promise<NoticeEntity[]> {
        return this.noticeService.getNotice()
    }

    @Post('add')
    async addNotice(@Body() noticeData) : Promise<void> {
        const { identifierCode, notice } = noticeData
        return this.noticeService.addNotice(identifierCode, notice)
    }
}

import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { 
    WebtoonService
} from './webtoon.service';

import axios from 'axios';
import { WebtoonEntity } from './entities/webtoon.entity';
import { WebtoonDto } from './dto/webtoon.dto';
import { mergeWebtoonDetailData } from 'src/lib/webtoonFactory';

require('dotenv').config()

const BASE_URL : string = process.env.BASEURL

@Controller('webtoon')
export class WebtoonController {

    constructor(
        private readonly webtoonService: WebtoonService,
    ) {
        this.init()
    }

    /**
     * 현재는 네이버 웹툰만 가져와서 업데이트 해주지만
     * 추후에 카카오, 레진코믹스 플랫폼 크롤링 루틴을 작성하여
     * 업데이트 루틴을 추가해주어야 함.
     */
    private async init() : Promise<void> {
        try {
            await this.webtoonService.clearTable()
            
            const requestList = await axios.get(`${BASE_URL}today`)
            const list = requestList.data

            const today : Date = new Date()
            const weekly : number = today.getDay()

            for(let i=0; i<list.length; ++i) {
                const { id, title, thumb } = list[i]
                const webtoon : WebtoonDto = {
                    webtoon_id: id,
                    title,
                    thumb,
                    weekly,
                    company: 'naver'
                }
                mergeWebtoonDetailData(webtoon, this.webtoonService)
            }
        } catch(e) {
            console.log(e)
        }
    }

    @Get('list')
    getAllToons() : Promise<WebtoonEntity[] | null> {
        return this.webtoonService.getAllToons()
    }

    @Get('/:id')
    getWebtoonById(@Param('id') id : string) : Promise<WebtoonEntity | null> {
        return this.webtoonService.findOneById(id)
    }
}

type Company = 'naver' | 'kakao' | 'lezhin'
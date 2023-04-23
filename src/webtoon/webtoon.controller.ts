import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { 
    EpisodeService,
    WebtoonService
} from './webtoon.service';

import { WebtoonEntity } from './entities/webtoon.entity';
import { EpisodeEntity } from './entities/episode.entity';

@Controller('webtoon')
export class WebtoonController {

    constructor(
        private readonly webtoonService: WebtoonService,
        private readonly episodeService: EpisodeService
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
            await this.webtoonService.load()
            await this.episodeService.load(0)
        } catch(e) {
            console.log(e)
        }
    }

    @Get('list')
    getAllToons() : Promise<WebtoonEntity[] | null> {
        return this.webtoonService.getAllToons()
    }

    @Get('episodes')
    getAllEpisodes() : Promise<EpisodeEntity[] | null> {
        return this.episodeService.getAllEpisode()
    }

    /* 쿼리, 파라미터를 받는 라우터와 위치를 나누어야 하며 */
    /* 일반 라우터를 상단에 그 외에 라우터를 하단에 배치한다. */

    @Get('/:id')
    getWebtoonById(@Param('id') id : string) : Promise<WebtoonEntity | null> {
        return this.webtoonService.findOneById(id)
    }

    @Get('/:id/episode')
    getEpisodeById(@Param('id') id : string) : Promise<EpisodeEntity | null> {
        return this.episodeService.findOneById(id)
    }
}

type Company = 'naver' | 'kakao' | 'lezhin'
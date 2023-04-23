import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { ToonFlixWebtoonDto } from './dto/toonflixWebtoon.dto';
import { WebtoonEntity } from './entities/webtoon.entity';
import { EpisodeEntity } from './entities/episode.entity';
import axios from 'axios';
import { WebtoonDto } from './dto/webtoon.dto';
import { mergeWebtoonDetailData } from 'src/lib/webtoonFactory';
import { EpisodeDto } from './dto/episode.dto';

require('dotenv').config()

const BASE_URL : string = process.env.BASEURL

@Injectable()
export class WebtoonService {
    constructor(
        @InjectRepository(WebtoonEntity)
        private webtoonRepository : Repository<WebtoonEntity>,
    ) {}
    async findOneById(id : string): Promise<WebtoonEntity | null> {
        return await this.webtoonRepository.findOneBy({ webtoon_id: id });
    }

    async getAllToons() : Promise<WebtoonEntity[] | null> {
        return await this.webtoonRepository.find({})
    }

    async checkUpdatedByWeekly() : Promise<boolean> {
        const today : Date = new Date()
        const weekly : number = today.getDay()

        const webtoons = await this.getAllToons()

        if(webtoons.length < 1 || webtoons[0].weekly !== weekly) return true
        return false
    }
    
    async insertOrUpdateWebtoon(webtoon: ToonFlixWebtoonDto[] | ToonFlixWebtoonDto) : Promise<InsertResult> {
        return await this.webtoonRepository.createQueryBuilder()
        .insert()
        .into(WebtoonEntity,[
            'title',
            'thumb',
            'webtoon_id',
            'weekly',
            'company',
            'about',
            'genre',
            'age',
        ])
        .values(webtoon)
        .orUpdate(
            [
                'title',
                'thumb',
                'webtoon_id',
                'price',
                'like_count',
                'weekly',
                'company',
                'about',
                'genre',
                'age',
            ],
            [
                'id'
            ],
            {
                skipUpdateIfNoValuesChanged: true
            }
        )
        .execute()
    }

    async load() : Promise<void> {
        try {
            const needUpdate : boolean = await this.checkUpdatedByWeekly()
            if(needUpdate) {
                console.log('웹툰 로드 시작.')

                await this.webtoonRepository.clear()
            
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
                    mergeWebtoonDetailData(webtoon, this)
                }
            }
            console.log('웹툰 로드 완료.')
        } catch(e) {
            console.log(e)
        }
    }
}

@Injectable()
export class EpisodeService {
    constructor(
        @InjectRepository(EpisodeEntity)
        private episodeRepository : Repository<EpisodeEntity>,
    ) {}

    async findOneById(webtoonId: string, episodeId : string): Promise<EpisodeEntity | null> {
        return await this.episodeRepository.findOneBy({
                webtoon_id: webtoonId, 
                episode_id: episodeId 
            });
    }

    async getAllEpisode(): Promise<EpisodeEntity[] | null> {
        return await this.episodeRepository.find()
    }

    async checkUpdatedByWeekly() : Promise<boolean> {
        const today : Date = new Date()
        const weekly : number = today.getDay()

        const episodes = await this.getAllEpisode()

        if(episodes.length < 1 || episodes[0].weekly !== weekly) return true
        return false
    }

    async insertOrUpdateEpisode(episode: EpisodeDto[] | EpisodeDto) : Promise<InsertResult> {
        return await this.episodeRepository.createQueryBuilder()
        .insert()
        .into(EpisodeEntity,[
            'webtoon_id',
            'thumb',
            'episode_id',
            'title',
            'uptime',
            'weekly',
        ])
        .values(episode)
        .orUpdate(
            [
                'webtoon_id',
                'thumb',
                'episode_id',
                'title',
                'uptime',
                'weekly',
            ],
            [
                'id'
            ],
            {
                skipUpdateIfNoValuesChanged: true
            }
        )
        .execute()
    }
    
    async load(retryCount: number) : Promise<void> {
        if(retryCount > 10) {
            throw new Error('웹툰 목록 조회횟수 초과')
        } else {
            const needUpdate : boolean = await this.checkUpdatedByWeekly()
            if(needUpdate) {
                console.log('에피소드 로드 시작.')

                const episodes : EpisodeEntity[] = await this.episodeRepository.find()
                if(episodes.length > 0) {
                    await this.episodeRepository.clear()

                    const today : Date = new Date()
                    const weekly : number = today.getDay()

                    for(let i=0; i<episodes.length; ++i) {
                        const webtoonId = episodes[i].webtoon_id
                        const requestEpisodes = await axios.get(`${BASE_URL}${webtoonId}/episodes`)

                        const [ episodeData ] = requestEpisodes.data // 최신화만 가져오기
                        const episode : EpisodeDto = {
                            webtoon_id: webtoonId,
                            episode_id: episodeData.id,
                            title: episodeData.title,
                            thumb: episodeData.thumb,
                            uptime: episodeData.date,
                            weekly
                        }

                        await this.insertOrUpdateEpisode(episode)
                    }

                    console.log('에피소드 로드 완료.')
                } else setTimeout(_=> this.load(++retryCount), 1000)
            } else console.log('에피소드 로드 완료.')
        }
    }
}

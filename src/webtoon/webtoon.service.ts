import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

import { ToonFlixWebtoonDto } from './dto/toonflixWebtoon.dto';
import { WebtoonEntity } from './entities/webtoon.entity';
import { EpisodeEntity } from './entities/episode.entity';
import axios from 'axios';
import { WebtoonDto } from './dto/webtoon.dto';
import { mergeWebtoonDetailData, initLezhinWebtoons } from 'src/lib/webtoonFactory';
import { EpisodeDto } from './dto/episode.dto';
import { CountsDto } from './dto/counts.dto';

import { exec } from 'child_process'

require('dotenv').config()

const BASE_URL : string = process.env.BASEURL
const ABSOLUTE_PATH : string = process.env.ABSOLUTE_PATH

@Injectable()
export class WebtoonService {
    constructor(
        @InjectRepository(WebtoonEntity)
        private webtoonRepository : Repository<WebtoonEntity>,
    ) {}

    async findOneById(id : string): Promise<WebtoonEntity | null> {
        return await this.webtoonRepository.findOneBy({ webtoon_id: id });
    }

    async getAllToons(category : string) : Promise<WebtoonEntity[] | null> {
        if(category === 'all') 
            return await this.webtoonRepository.find()

        return await this.webtoonRepository.findBy({
            company: category
        })
    }

    async getBestWebtoon() : Promise<WebtoonEntity> {
        const webtoons : WebtoonEntity[] = await this.getAllToons('all')
        return webtoons.sort((a, b) => {
            const { like_count: aCount } = a
            const { like_count: bCount } = b
            if(aCount > bCount) return -1
            else if(aCount < bCount) return 1
            return 0
        })[0]
    }

    async getWebtoonCounts(webtoonId : string) : Promise<CountsDto> {
        const { like_count, comment_count } = await this.webtoonRepository.findOneBy({webtoon_id: webtoonId})
        return { likecount: like_count, commentcount: comment_count }
    }

    async increaseLikeCount(webtoonId: string) : Promise<boolean> {
        const result : UpdateResult = await this.webtoonRepository.createQueryBuilder()
        .update(WebtoonEntity)
        .set({
            like_count: () => 'like_count + 1'
        })
        .where('webtoon_id = :webtoonId', {webtoonId})
        .execute()

        return result.affected === 1
    }

    async subtractLikeCount(webtoonId: string) : Promise<boolean> {
        const result : UpdateResult = await this.webtoonRepository.createQueryBuilder()
        .update(WebtoonEntity)
        .set({
            like_count: () => 'like_count - 1'
        })
        .where('webtoon_id = :webtoonId', {webtoonId})
        .execute()

        return result.affected === 1
    }

    async increaseCommentCount(webtoonId: string) : Promise<boolean> {
        const result : UpdateResult = await this.webtoonRepository.createQueryBuilder()
        .update(WebtoonEntity)
        .set({
            comment_count: () => 'comment_count + 1'
        })
        .where('webtoon_id = :webtoonId', {webtoonId})
        .execute()

        return result.affected === 1
    }

    async subtractCommentCount(webtoonId: string) : Promise<boolean> {
        const result : UpdateResult = await this.webtoonRepository.createQueryBuilder()
        .update(WebtoonEntity)
        .set({
            comment_count: () => 'comment_count - 1'
        })
        .where('webtoon_id = :webtoonId', {webtoonId})
        .execute()

        return result.affected === 1
    }

    async checkUpdatedByDay() : Promise<boolean> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const webtoon : WebtoonEntity | null = await this.webtoonRepository.findOneBy({id: 1})

        if(webtoon === null || webtoon.day !== day) return true
        return false
    }

    async launchCrawlers() : Promise<void> {
        try {
            await this.lanchNaverCrawler()
            await this.launchLezhinCrawler()
        } catch(e) {
            throw new Error()
        }
    }

    async launchLezhinCrawler() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            exec(`${ABSOLUTE_PATH}start.bat`, async (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error.toString()}`);
                    reject()
                }
    
                if (stderr) {
                    console.error(`exec stderr: ${stderr.toString()}`);
                    reject()
                }
                await initLezhinWebtoons(this)
                resolve()
            })
        })
    }

    async lanchNaverCrawler() : Promise<void> {
        const naver = await axios.get(`${BASE_URL}today`)
        const naverDatas = naver.data

        const today : Date = new Date()
        const day : number = today.getDay()

        for(let i=0; i<naverDatas.length; ++i) {
            const { id, title, thumb } = naverDatas[i]
            const webtoon : WebtoonDto = {
                webtoon_id: id,
                title,
                thumb,
                day,
                company: 'naver'
            }
            mergeWebtoonDetailData(webtoon, this)
        }
    }

    async insertOrUpdateWebtoon(webtoon: ToonFlixWebtoonDto[] | ToonFlixWebtoonDto) : Promise<InsertResult> {
        return await this.webtoonRepository.createQueryBuilder()
        .insert()
        .into(WebtoonEntity,[
            'title',
            'thumb',
            'webtoon_id',
            'day',
            'company',
            'genre',
        ])
        .values(webtoon)
        .orUpdate(
            [
                'title',
                'thumb',
                'webtoon_id',
                'price',
                'like_count',
                'day',
                'company',
                'genre',
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
            const needUpdate : boolean = await this.checkUpdatedByDay()
            if(needUpdate) {
                console.log('웹툰 로드 시작.')
                await this.webtoonRepository.clear()
                await this.launchCrawlers()
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
        @InjectRepository(WebtoonEntity)
        private webtoonRepository : Repository<WebtoonEntity>,
    ) {}

    async findOneById(webtoonId: string): Promise<EpisodeEntity | null> {
        return await this.episodeRepository.findOneBy({
                webtoon_id: webtoonId
            });
    }

    async getAllEpisode(): Promise<EpisodeEntity[] | null> {
        return await this.episodeRepository.find()
    }

    async checkUpdatedByDay() : Promise<boolean> {
        const today : Date = new Date()
        const day : number = today.getDay()

        const episode : EpisodeEntity | null = await this.episodeRepository.findOneBy({id: 1})

        if(episode === null || episode.day !== day) return true
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
            'day',
        ])
        .values(episode)
        .orUpdate(
            [
                'webtoon_id',
                'thumb',
                'episode_id',
                'title',
                'uptime',
                'day',
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
            const needUpdate : boolean = await this.checkUpdatedByDay()
            if(needUpdate) {
                console.log('에피소드 로드 시작.')

                const webtoons : WebtoonEntity[] = await this.webtoonRepository.find()
                if(webtoons.length > 0 || !webtoons) {
                    await this.episodeRepository.clear()

                    const today : Date = new Date()
                    const day : number = today.getDay()
                    const episodes : EpisodeDto[] = []

                    for(let i=0; i<webtoons.length; ++i) {
                        const company = webtoons[i].company
                        if(company === 'lezhin') continue

                        const webtoonId = webtoons[i].webtoon_id
                        const requestEpisodes = await axios.get(`${BASE_URL}${webtoonId}/episodes`)

                        const [ episodeData ] = requestEpisodes.data // 최신화만 가져오기
                        const episode : EpisodeDto = {
                            webtoon_id: webtoonId,
                            episode_id: `${parseInt(episodeData.id) + 1}`,
                            title: episodeData.title,
                            thumb: episodeData.thumb,
                            uptime: episodeData.date,
                            day
                        }
                        episodes.push(episode)
                    }

                    await this.insertOrUpdateEpisode(episodes);
                    console.log('에피소드 로드 완료.')
                } else setTimeout(_=> this.load(++retryCount), 1000)
            } else console.log('에피소드 로드 완료.')
        }
    }
}

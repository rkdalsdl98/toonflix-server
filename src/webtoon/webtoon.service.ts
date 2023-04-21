import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { ToonFlixWebtoonDto } from './dto/toonflixWebtoon.dto';
import { WebtoonEntity } from './entities/webtoon.entity';

@Injectable()
export class WebtoonService {
    constructor(
        @InjectRepository(WebtoonEntity)
        private webtoonRepository : Repository<WebtoonEntity>
    ) {}

    async findOneById(id : string): Promise<WebtoonEntity | null> {
        return await this.webtoonRepository.findOneBy({ webtoon_id: id });
    }

    async getAllToons(): Promise<WebtoonEntity[] | null> {
        const today : Date = new Date()
        const weekly : number = today.getDay()
        
        return await this.webtoonRepository.find({
            where: {
                weekly
            }
        })
    }

    async clearTable(): Promise<void> {
        await this.webtoonRepository.clear()
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
}

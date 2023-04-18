import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { WebtoonDto } from './dto/webtoon.dto';
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
    
    async insertOrUpdateWebtoon(webtoon: WebtoonDto[] | WebtoonDto) : Promise<InsertResult> {
        return await this.webtoonRepository.createQueryBuilder()
        .insert()
        .into(WebtoonEntity,[
            'id',
            'title',
            'thumb',
            'webtoon_id',
            'weekly',
            'company',
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

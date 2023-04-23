import { DataSourceOptions } from 'typeorm';
import { WebtoonEntity } from './webtoon/entities/webtoon.entity';
import { EpisodeEntity } from './webtoon/entities/episode.entity';

const ormconfig: DataSourceOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "rkdalsdl112q!",
    "database": "toonflix",
    "entities": [
        WebtoonEntity,
        EpisodeEntity
    ],
    "timezone": 'Z',
    "synchronize": true,
}
export default ormconfig;
import { DataSourceOptions } from 'typeorm';
import { WebtoonEntity } from './webtoon/entities/webtoon.entity';

const ormconfig: DataSourceOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "rkdalsdl112q!",
    "database": "toonflix",
    "entities": [
        WebtoonEntity,
    ],
    "timezone": 'Z',
    "synchronize": true,
}
export default ormconfig;
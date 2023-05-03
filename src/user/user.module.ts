import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WebtoonEntity } from 'src/webtoon/entities/webtoon.entity';
import { WebtoonService } from 'src/webtoon/webtoon.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            WebtoonEntity
        ]),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        WebtoonService
    ]
})
export class UserModule {}

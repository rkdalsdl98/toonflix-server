import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebtoonModule } from './webtoon/webtoon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './webtoon/comment/comment.module';

import config from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    WebtoonModule,
    UserModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

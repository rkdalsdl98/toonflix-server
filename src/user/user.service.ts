import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserRegistDto } from './dto/userRegist.dto';
import { cryptionPass, hashing } from './private/verify';
import { UserDto } from './dto/user.dto';
import { UserLikedRequest } from './dto/userLiked.dto';
import { WebtoonService } from 'src/webtoon/webtoon.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>,
        private readonly webtoonService : WebtoonService
    ) {
    }

    async userLogin(user : UserLoginDto) : Promise<UserDto | null> {
        try {
            const findUser = await this.getUserById(user.userId)
            const result = hashing(user, findUser)

            const today : Date = new Date()
            const day = ("0" + today.getDate()).slice(-2)
            const month = ("0" + (today.getMonth() + 1)).slice(-2)
            
            if(result) {
                if(day !== user.day) {
                    await this.resetLiked({
                        pk: findUser.id, 
                        userId: findUser.name
                    })
                }

                console.log(`[${today.getFullYear()}-${month}-${day}]:${findUser.name}:유저 로그인`)
                return {
                    pk: findUser.id,
                    nickname: findUser.nickname,
                    cash: findUser.cash,
                    liked: findUser.liked,
                    birth: findUser.birth,
                    userId: findUser.name
                }
            } else {
                return null
            }
        } catch(e) {
            return null;
        }
    }

    async registUser(regist: UserRegistDto) : Promise<void> {
        const { pass } = regist
        const { salt, cryption } = cryptionPass(pass) 

        await this.insertOrUpdateUser({
            name: regist.name,
            pass: cryption,
            salt,
            nickname: regist.nickname,
            birth: regist.birth,
            liked: ''
        })
    }

    async isDuplicatedId(userId: string) : Promise<Boolean> {
        const res = await this.getUserById(userId)
        if(res === null) return false
        return true
    }

    /****************************내부용******************************/
    async getUserById(userId : string) : Promise<UserEntity | null> {
        return this.userRepository.findOneBy({
            name: userId
        })
    }

    async resetLiked(resetUser : any) : Promise<void> {
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({
                liked: ''
            })
            .andWhere('pk = :requestPk', {requestPk: parseInt(resetUser.pk)})
            .where('name = :userId', {userId: resetUser.userId})
            .execute()
    }

    async updateUserLiked(req: UserLikedRequest) : Promise<void> {
        await this.userRepository.createQueryBuilder()
            .update(UserEntity)
            .set({
                liked: req.likes
            })
            .andWhere('pk = :requestPk', {requestPk: parseInt(req.pk)})
            .where('name = :userId', {userId: req.userId})
            .execute()
        
        if(req.isSubtract === 'true') await this.webtoonService.subtractLikeCount(req.webtoon_id)
        else await this.webtoonService.increaseLikeCount(req.webtoon_id)
    }

    async insertOrUpdateUser(regist: UserRegistDto) : Promise<void> {
        await this.userRepository.createQueryBuilder()
        .insert()
        .into(UserEntity,[
            'name',
            'pass',
            'nickname',
            'birth',
            'salt',
            'liked'
        ])
        .values(regist)
        .orUpdate(
            [
                'name',
                'pass',
                'nickname',
                'birth',
                'salt',
                'liked'
            ],
            [
                'id'
            ],
            {
                skipUpdateIfNoValuesChanged: true
            }
        )
        .execute();
    }
}
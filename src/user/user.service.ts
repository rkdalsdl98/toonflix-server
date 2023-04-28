import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserRegistDto } from './dto/userRegist.dto';
import { cryptionPass, hashing } from './private/verify';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>,
    ) {
    }

    async userLogin(user : UserLoginDto) : Promise<UserEntity | null> {
        try {
            const findUser = await this.getUserById(user.userId)
            const result = hashing(user, findUser)

            if(result) return findUser
        } catch(e) {
            return null
        }
    }

    async registUser(regist: UserRegistDto) {
        const { pass } = regist
        const { salt, cryption } = cryptionPass(pass) 

        this.insertOrUpdateUser({
            name: regist.name,
            pass: cryption,
            salt,
            nickname: regist.nickname,
            birth: regist.birth
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

    async insertOrUpdateUser(regist: UserRegistDto) : Promise<void> {
        const result : InsertResult = await this.userRepository.createQueryBuilder()
        .insert()
        .into(UserEntity,[
            'name',
            'pass',
            'nickname',
            'birth',
            'salt'
        ])
        .values(regist)
        .orUpdate(
            [
                'name',
                'pass',
                'nickname',
                'birth',
                'salt'
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
import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    readonly pk : number

    @IsString()
    readonly nickname: string

    @IsNumber()
    readonly cash: number

    @IsString()
    readonly liked: string

    @IsString()
    readonly birth: string

    @IsString()
    readonly userId: string
}

// 로그인 이후 유저가 전달 받을 데이터 구조
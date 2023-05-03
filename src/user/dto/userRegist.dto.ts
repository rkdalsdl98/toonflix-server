import { IsString } from "class-validator";

export class UserRegistDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly pass: string

    @IsString()
    readonly nickname: string

    @IsString()
    readonly birth: string

    @IsString()
    readonly salt: string

    @IsString()
    readonly liked: string
}

// 회원가입시 받을 데이터 구조
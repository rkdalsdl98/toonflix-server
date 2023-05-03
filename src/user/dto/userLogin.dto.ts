import { IsString } from "class-validator";

export class UserLoginDto {
    @IsString()
    readonly userId: string

    @IsString()
    readonly userPass: string

    @IsString()
    readonly day: string
}

// 로그인시 받을 데이터 구조
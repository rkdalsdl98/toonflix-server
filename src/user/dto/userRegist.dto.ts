import { IsString } from "class-validator";

export class UserRegistDto {
    @IsString()
    name: string

    @IsString()
    pass: string

    @IsString()
    nickname: string

    @IsString()
    birth: string

    @IsString()
    salt: string
}
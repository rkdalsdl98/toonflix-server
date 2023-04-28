import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsString()
    name: string

    @IsString()
    pass: string

    @IsString()
    nickname: string

    @IsNumber()
    cash: number

    @IsString()
    liked: string

    @IsString()
    birth: string
}
import { IsString } from "class-validator";

export class WebtoonDetailDto {
    @IsString()
    readonly about: string

    @IsString()
    readonly genre: string

    @IsString()
    readonly age: string
}
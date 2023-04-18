import { IsNumber, IsString } from "class-validator";

export class WebtoonDto {
    @IsNumber()
    readonly id : number

    @IsString()
    readonly webtoon_id : string

    @IsString()
    readonly title : string

    @IsString()
    readonly thumb : string

    @IsNumber()
    readonly weekly : number

    @IsString()
    readonly company : string
}
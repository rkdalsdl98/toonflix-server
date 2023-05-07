import { IsNumber, IsString } from "class-validator";

export class WebtoonDto {
    @IsString()
    readonly webtoon_id : string

    @IsString()
    readonly title : string

    @IsString()
    readonly thumb : string

    @IsNumber()
    readonly day : number

    @IsString()
    readonly company : string
}
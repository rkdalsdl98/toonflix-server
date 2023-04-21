import { IsNumber, IsString } from "class-validator";

export class ToonFlixWebtoonDto {
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
    
    @IsString()
    readonly about: string

    @IsString()
    readonly genre: string

    @IsString()
    readonly age: string
}
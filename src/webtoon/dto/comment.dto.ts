import { IsString, IsNumber } from "class-validator";

export class CommentDto {
    @IsString()
    comment_text : string

    @IsString()
    owner : string

    @IsNumber()
    owner_id : number

    @IsString()
    webtoon_id : string

    @IsString()
    uptime : string

    @IsNumber()
    day : number
}
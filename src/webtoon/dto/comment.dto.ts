import { IsString, IsNumber } from "class-validator";

export class CommentDto {
    @IsNumber()
    commentId : number

    @IsString()
    commentText : string

    @IsNumber()
    likecount : number

    @IsString()
    owner : string

    @IsNumber()
    ownerId : number

    @IsString()
    webtoonId : string

    @IsString()
    uptime : string
}
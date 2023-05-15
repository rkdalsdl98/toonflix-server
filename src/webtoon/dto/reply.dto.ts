import { IsString, IsNumber } from "class-validator";

export class ReplyDto {
    @IsNumber()
    readonly comment_id : string

    @IsString()
    readonly reply_text : string

    @IsString()
    readonly owner : string

    @IsString()
    readonly owner_id : string

    @IsString()
    readonly uptime : string

    @IsNumber()
    readonly day : number
}
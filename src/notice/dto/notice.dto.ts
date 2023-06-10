import { IsString } from "class-validator";

export class NoticeDto {
    @IsString()
    content : string

    @IsString()
    imageUrl : string | null

    @IsString()
    category : string
}
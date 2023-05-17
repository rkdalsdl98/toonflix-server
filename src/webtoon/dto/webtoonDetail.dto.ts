import { IsString } from "class-validator";

export class WebtoonDetailDto {
    @IsString()
    readonly genre: string
}
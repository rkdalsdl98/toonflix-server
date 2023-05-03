import { IsNumber } from "class-validator";

export class CountsDto {
    @IsNumber()
    readonly likecount : number

    @IsNumber()
    readonly commentcount : number
}
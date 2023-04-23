import { IsNumber, IsString } from "class-validator";

export class EpisodeDto {
    @IsString()
    webtoon_id: string

    @IsString()
    thumb: string

    @IsString()
    episode_id: string

    @IsString()
    title: string

    @IsString()
    uptime: string

    @IsNumber()
    weekly: number
}
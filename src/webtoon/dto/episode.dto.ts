import { IsNumber, IsString } from "class-validator";

export class EpisodeDto {
    @IsString()
    readonly webtoon_id: string

    @IsString()
    readonly thumb: string

    @IsString()
    readonly episode_id: string

    @IsString()
    readonly title: string

    @IsString()
    readonly uptime: string

    @IsNumber()
    readonly day: number
}
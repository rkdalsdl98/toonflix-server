import { IsString } from "class-validator";

export class UserLikedRequest {
    @IsString()
    readonly pk : string

    @IsString()
    readonly likes : string

    @IsString()
    readonly webtoon_id : string

    @IsString()
    readonly userId : string

    @IsString()
    readonly isSubtract : string
}

// 찜목록 업데이트시 받을 데이터 구조
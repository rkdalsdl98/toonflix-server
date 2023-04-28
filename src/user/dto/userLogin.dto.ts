import { IsString } from "class-validator";

export class UserLoginDto {
    @IsString()
    userId: string

    @IsString()
    userPass: string
}

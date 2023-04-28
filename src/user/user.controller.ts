import { Controller, Post, Patch, Body, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserRegistDto } from './dto/userRegist.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    userLogin(@Body() user : UserLoginDto) {
        return this.userService.userLogin(user)
    }

    @Post('regist')
    registUser(@Body() user : UserRegistDto) {
        return this.userService.registUser(user)
    }

    @Get('duplicated/:id')
    isDuplicated(@Param('id') userId : string) {
        return this.userService.isDuplicatedId(userId)
    }
}

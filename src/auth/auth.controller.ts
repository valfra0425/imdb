import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { Users } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CredenciaisDto } from './dtos/credenciais.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
    }

    @Post('/singup')
    async singUp(@Body() usersDto: CreateUsersDto){
        return this.authService.singUp(usersDto);
    }

    @Post('/singin')
    async singIn(@Body() credenciaisDto: CredenciaisDto): Promise<{acessToken: string}>{
        return this.authService.singIn(credenciaisDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getMe(@GetUser()user: Users){
        return this.authService.getMe(user);
    }
}

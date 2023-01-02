import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { UsersRepository } from 'src/users/users.repository';
import { CredenciaisDto } from './dtos/credenciais.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt/dist";
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {

    constructor(private usersRepository: UsersRepository, private jwtService: JwtService){
    }

    async singUp(usersDto: CreateUsersDto){
        return this.usersRepository.createUser(usersDto);
    }

    async singIn(credenciaisDto: CredenciaisDto): Promise<{acessToken: string}>{
        const {email, password} = credenciaisDto;
        const user = await this.usersRepository.findByEmail(email)
        if (user && (await bcrypt.compare(password, user.password))){
            const payload = {email};
            const acessToken = this.jwtService.sign(payload)
            return {acessToken};
        }else {
            throw new UnauthorizedException("O email ou a senha estão errados")
        }
    }

    async getMe(user){
        return this.usersRepository.findOne(user.id);
    }
    
}

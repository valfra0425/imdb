import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private usersRepository: UsersRepository){
        super({secretOrKey: "DNDN", jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()});
    }

    async validate(payload: {email:string}){
        const {email} = payload;
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}
import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export enum role {
    ADM = 'adm',
    COMMON = 'common',
    CRITIC = 'critic'
  }

export class CreateUsersDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsIn(['common', 'adm', 'critic'])
    role: role = role.COMMON;
}
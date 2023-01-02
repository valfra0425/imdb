import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CredenciaisDto {
    
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
}
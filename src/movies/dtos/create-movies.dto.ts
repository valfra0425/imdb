import { IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength } from "class-validator";

export class CreateMoviesDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;

    description: string;

    @IsNotEmpty()
    @IsString()
    duration: string;

    @IsNotEmpty()
    @IsNumberString()
    @IsString()
    @MaxLength(4)
    year: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    director: string;
}
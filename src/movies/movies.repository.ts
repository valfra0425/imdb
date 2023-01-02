import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMoviesDto } from "./dtos/create-movies.dto";
import { UpdateMoviesDto } from "./dtos/update-movies.dto";
import { Movies } from "./movies.entity";

@Injectable()
export class MoviesRepository{

    constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>){
    }

    async findAll(){
        return this.moviesRepository.find();
    }

    async findOne(id){
        return this.moviesRepository.findOne({where: {id: id}})
    }

    async createMovie(moviesDto: CreateMoviesDto){
        const {title, description, duration, year, director} = moviesDto;
        let movie = this.moviesRepository.create({
            title,
            description,
            duration,
            year,
            director
        })
        try {
            await this.moviesRepository.save(movie);
        }
        catch(error) {
            if (error.errno == 1062){
                throw new ConflictException("alguns dos valores já existe no banco");
            }
            throw error;
        }
        return movie;
    }

    async updateMovie(moviesDto: UpdateMoviesDto, id) {
        const {title, description, duration, year, director} = moviesDto;
        const movie = await this.findOne(id);
        if(!movie){
            throw new NotFoundException();
        }
        movie.title = title;
        movie.description = description;
        movie.duration = duration;
        movie.year = year;
        movie.director = director;
        try {
            await this.moviesRepository.save(movie);
        }
        catch(error) {
            if (error.errno == 1062){
                throw new ConflictException("alguns dos valores já existe no banco");
            }
            throw error;
        }
        return movie;
    }

    async deleteMovie(id){
        this.moviesRepository.delete(id);
        return true;
    }


}
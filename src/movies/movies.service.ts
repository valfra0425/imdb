import { Injectable } from '@nestjs/common';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { UpdateMoviesDto } from './dtos/update-movies.dto';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {

    constructor(private moviesRepository: MoviesRepository){
    }

    async findAll() {
        return this.moviesRepository.findAll();
    }

    async findOne(id) {
        return this.moviesRepository.findOne(id);
    }

    async createMovie(moviesDto: CreateMoviesDto){
        return this.moviesRepository.createMovie(moviesDto);
    }

    async updateMovie(moviesDto: UpdateMoviesDto, id){
        return this.moviesRepository.updateMovie(moviesDto, id);
    }

    async deleteMovie(id){
        return this.moviesRepository.deleteMovie(id);
    }
}

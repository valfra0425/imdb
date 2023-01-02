import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateMoviesDto } from './dtos/create-movies.dto';
import { UpdateMoviesDto } from './dtos/update-movies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MoviesController {

    constructor(private moviesService: MoviesService){
    }

    @Get()
    @Roles('adm', 'common', 'critic')
    async findAll(){
        return this.moviesService.findAll();
    }

    @Get(':id')
    @Roles('adm', 'common', 'critic')
    async findOne(@Param('id') id){
        return this.moviesService.findOne(id);
    }

    @Roles('adm')
    @Post()
    async createMovie(@Body() moviesDto: CreateMoviesDto){
        return this.moviesService.createMovie(moviesDto);
    }
    
    @Roles('adm')
    @Patch(':id')
    async updateMovie(@Param('id') id, @Body() moviesDto: UpdateMoviesDto){
        return this.moviesService.updateMovie(moviesDto, id);
    }

    @Roles('adm')
    @Delete(':id')
    async deleteMovie(@Param('id') id){
        return this.moviesService.deleteMovie(id);
    }
}

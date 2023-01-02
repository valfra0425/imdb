import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { UserMovieController } from './user-movie.controller';
import { UserMovie } from './user-movie.entity';
import { UserMovieRepository } from './user-movie.repository';
import { UserMovieService } from './user-movie.service';

@Module({
    imports: [UsersModule, MoviesModule, TypeOrmModule.forFeature([UserMovie])],
    controllers: [UserMovieController],
    providers: [UserMovieService, UserMovieRepository],
    exports: []
})
export class UserMovieModule {}

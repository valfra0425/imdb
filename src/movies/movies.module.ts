import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MoviesController } from './movies.controller';
import { Movies } from './movies.entity';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movies]), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: []
})
export class MoviesModule {}

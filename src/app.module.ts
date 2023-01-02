import "reflect-metadata";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { Movies } from './movies/movies.entity';
import { UserMovieModule } from './user-movie/user-movie.module';
import { UserMovie } from './user-movie/user-movie.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "imdb",
    autoLoadEntities: true,
    synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    UserMovieModule,
  ],
  controllers: [AppController],
  providers: [AppService,
  ],
})
export class AppModule {
}

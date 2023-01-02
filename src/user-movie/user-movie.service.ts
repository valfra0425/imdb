import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { UserMovieRepository } from './user-movie.repository';

@Injectable()
export class UserMovieService {

    constructor(private userMovieRepository: UserMovieRepository){}

    async getMoviesByUser(user: Users){
        return this.userMovieRepository.getMoviesByUser(user);
    }

    async getRelection(user: Users, id){
        return this.userMovieRepository.getRelection(user, id);
    }

    async createRelaction(id, relation, user: Users){
        return this.userMovieRepository.createRelaction(id, relation, user);
    }

    async updateRelaction(id, relation, user: Users){
        return this.userMovieRepository.updateRelaction(id, relation, user);
    }

    async setGrade(id, grade, user: Users){
        return this.userMovieRepository.setGrade(id, grade, user);
    }

    async delete(user: Users, id){
        return this.userMovieRepository.delete(user, id);
    }

}

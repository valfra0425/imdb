import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { UserMovie } from "./user-movie.entity";

@Injectable()
export class UserMovieRepository {

    constructor(@InjectRepository(UserMovie) private moviesRepository: Repository<UserMovie>){}

    async getMoviesByUser(user: Users){
        console.log(user.id)
        return this.moviesRepository.find({where: {userId: user.id}});
    }

    async getRelection(user: Users, id){
        return this.moviesRepository.find({where: {userId: user.id, movieId: id}});
    }

    async createRelaction(id, relation, user: Users){
        const movieUser = this.moviesRepository.create({
            movieId: id,
            userId: user.id,
            relation: relation
        })
        try{
            await this.moviesRepository.save(movieUser);
        }
        catch (error){
            if (error.errno == 1062){
                throw new ConflictException("alguns dos valores já existe no banco");
            }
            throw error;
        }
        return movieUser;
    }

    async updateRelaction(id, relation, user: Users){
        try{
            this.moviesRepository.createQueryBuilder()
            .update(UserMovie)
            .set({relation: relation})
            .where({movieId: id})
            .where({userId: user.id})
            .execute()
        }
        catch (error){
            if (error.errno == 1062){
                throw new ConflictException("alguns dos valores já existe no banco");
            }
            throw error;
        }
        return this.getRelection(user, id);
    }

    async setGrade(id, grade, user: Users){
        if (user.role == 'critic'){
            try{
                await this.moviesRepository.createQueryBuilder()
                .update(UserMovie)
                .set({gradec: grade})
                .where({movieId: id})
                .where({userId: user.id})
                .execute()
            }
            catch (error){
                if (error.errno == 1062){
                    throw new ConflictException("alguns dos valores já existe no banco");
                }
                throw error;
            }
        }else {
            try{
                await this.moviesRepository.createQueryBuilder()
                .update(UserMovie)
                .set({grade: grade})
                .where({movieId: id})
                .where({userId: user.id})
                .execute()
            }
            catch (error){
                if (error.errno == 1062){
                    throw new ConflictException("alguns dos valores já existe no banco");
                }
                throw error;
            }
        }
        return this.getRelection(user, id);
    }

    async delete(user: Users, id){
        this.moviesRepository.delete({userId: user.id, movieId: id});

        return true;
    }
}
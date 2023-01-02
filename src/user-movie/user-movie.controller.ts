import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Users } from 'src/users/users.entity';
import { UserMovieService } from './user-movie.service';

@Controller('user-movie')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserMovieController {

    constructor(private userMovieService: UserMovieService){}

    @Get()
    @Roles('common', 'critic')
    async getMoviesByUser(@GetUser()user: Users){
        return this.userMovieService.getMoviesByUser(user);
    }

    @Get(':id')
    @Roles('common', 'critic')
    async getRelection(@GetUser()user: Users, @Param('id') id){
        return this.userMovieService.getRelection(user, id);
    }

    @Post(':id')
    @Roles('common', 'critic')
    async createRelaction(@Param('id') id, @Body('relation')relation, @GetUser()user: Users){
        return this.userMovieService.createRelaction(id, relation, user)
    }

    @Patch(':id')
    @Roles('common', 'critic')
    async updateRelaction(@Param('id') id, @Body('relation')relation, @GetUser()user: Users){
        return this.userMovieService.updateRelaction(id, relation, user)
    }

    @Patch('grade/:id')
    @Roles('common', 'critic')
    async setGrade(@Param('id') id, @Body('grade')grade, @GetUser()user: Users){
        return this.userMovieService.setGrade(id, grade, user)
    }

    @Delete(':id')
    @Roles('common', 'critic')
    async delete(@GetUser()user: Users, @Param('id') id){
        return this.userMovieService.delete(user, id)
    }
}

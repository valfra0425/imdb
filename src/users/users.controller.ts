import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService){
    }

    @Get()
    @Roles('adm')
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    @Roles('adm')
    async findOne(@Param('id') id){
        return this.usersService.findOne(id);
    }

    @Post()
    @Roles('adm')
    async createUser(@Body() usersDto: CreateUsersDto) {
        return this.usersService.createUser(usersDto);
    }

    @Patch(":id")
    @Roles('adm', 'critic', 'common')
    async updateUser(@Body() usersDto: UpdateUsersDto, @Param('id') id) {
        return this.usersService.updateUser(id, usersDto);
    }

    @Delete(":id")
    @Roles('adm', 'critic', 'common')
    async deleteUser(@Param('id') id) {
        return this.usersService.deleteUser(id);
    }
}

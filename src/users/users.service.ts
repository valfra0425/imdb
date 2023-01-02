import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository){
    }

    async findAll() {
        return this.usersRepository.findAll();
    }

    async findOne(id){
        return this.usersRepository.findOne(id)
    }

    async createUser(usersDto: CreateUsersDto) {
        return this.usersRepository.createUser(usersDto);
    }

    async updateUser(id, usersDto: UpdateUsersDto) {
        return this.usersRepository.updateUser(id, usersDto);
    }

    async deleteUser(id) {
        return this.usersRepository.deleteUser(id);
    }
}


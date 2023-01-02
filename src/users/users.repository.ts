import { Injectable } from "@nestjs/common";
import { ConflictException, NotFoundException} from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsersDto } from "./dtos/create-users.dto";
import { UpdateUsersDto } from "./dtos/update-users.dto";
import { Users } from "./users.entity";
import * as bcrypt from 'bcrypt';
import { Movies } from "src/movies/movies.entity";

@Injectable()
export class UsersRepository{

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>){
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id){
        return this.usersRepository.findOne({where: {id: id}})
    }

    async findByEmail(email){
        return this.usersRepository.findOne({where: {email: email}})
    }

    async createUser(usersDto: CreateUsersDto) {
        const {name, role, email, password} = usersDto;
        let salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        let user = this.usersRepository.create({
            name,
            email,
            password: hashedPass,
            role
        })
        try {
            await this.usersRepository.save(user);
        }catch(error){
            if (error.errno == 1062){
                throw new ConflictException("já existe uma conta com este e-mail e/ou senha cadastrado");
            }
            throw error;
        }
        return user;
    }

    async updateUser(id, usersDto: UpdateUsersDto) {
        const {name, role, email, password} = usersDto;
        const user = await this.findOne(id);
        let salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        if(!user){
            throw new NotFoundException();
        }
        user.name = name;
        user.role = role;
        user.email = email;
        user.password = hashedPass;
        try {
            await this.usersRepository.save(user);
        }catch(error){
            if (error.errno == 1062){
                throw new ConflictException("já existe uma conta com este e-mail e/ou senha cadastrado");
            }
            throw error;
        }
        return user;
    }

    async deleteUser(id) {
        this.usersRepository.delete(id)
        return true
    }
}
import { Movies } from "src/movies/movies.entity";
import { UserMovie } from "src/user-movie/user-movie.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

export enum role {
    ADM = 'adm',
    COMMON = 'common',
    CRITIC = 'critic'
  }

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    password: string;

    @Column({
        type: 'enum',
        default: 'common',
        enum: role,
    })
    role: role;

    @OneToMany(() => UserMovie, userMovie => userMovie.user)
    public userMovie: UserMovie[];

}
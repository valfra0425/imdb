import { Movies } from "src/movies/movies.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class UserMovie {

    @Column()
    relation: string;

    @Column({
        type: 'int',
        nullable: true
    })
    grade: number;

        @Column({
        type: 'int',
        nullable: true
    })
    gradec: number;

    @PrimaryColumn()
    movieId: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => Movies, (movie) => movie.userMovie)
    public movie!: Movies;
    
    @ManyToOne(() => Users, (user) => user.userMovie)
    public user!: Users;
}
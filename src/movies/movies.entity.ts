import { UserMovie } from "src/user-movie/user-movie.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movies {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 2000,
        unique: true
    })
    description: string;

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

    @Column()
    duration: string;

    @Column({
        type: "varchar",
        length: 4
    })
    year: string;

    @Column()
    director: string;

    @OneToMany(() => UserMovie, userMovie => userMovie.movie)
    public userMovie: UserMovie[];

}
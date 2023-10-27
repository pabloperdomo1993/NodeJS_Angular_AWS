import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    createAt: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}
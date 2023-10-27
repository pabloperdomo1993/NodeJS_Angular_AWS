import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./post.entity";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/users/user.service";
import { User } from "src/users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, User])
    ],
    controllers: [PostController],
    providers: [PostService, AuthService, UserService]
})

export class PostModule { }
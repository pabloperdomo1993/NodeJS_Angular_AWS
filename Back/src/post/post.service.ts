import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Posts } from './post.entity';
import { GetMyPostDto } from './dto/get-my-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>
  ) { }

  async createPost(data: CreatePostDto) {
    const body = {
      message: data.message,
      title: data.title,
      user: null,
      createAt: new Date()
    }

    const user = await this.userRepository.findOneBy({ email: data.email });
    body.user = user.id;

    const obj = this.postRepository.create(body);
    const response = await this.postRepository.save(obj);
    return { response: response, message: 'Post created' };
  }

  async getMyPosts(data: GetMyPostDto) {
    const response = await this.userRepository.findOneBy({ email: data.email });
    const posts = await this.postRepository.find({ relations: ['user'] });

    if (posts.length === 0) return [];

    const items = posts.map((x: any) => {
      const dateOriginal = x.createAt;
      const year = dateOriginal.getFullYear();
      const month = (dateOriginal.getMonth() + 1).toString().padStart(2, '0');
      const day = dateOriginal.getDate().toString().padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;

      return {
        title: x.title,
        id: x.id,
        message: x.message,
        date: newDate,
        userId: x.user.id
      }
    }).filter(x => x.userId === response.id);

    return items;
  }

  async allPosts() {
    const response = await this.postRepository.find({ relations: ['user'] });

    if (response.length === 0) return [];

    const items = response.map((x: any) => {
      const dateOriginal = x.createAt;
      const year = dateOriginal.getFullYear();
      const month = (dateOriginal.getMonth() + 1).toString().padStart(2, '0');
      const day = dateOriginal.getDate().toString().padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;
      return {
        title: x.title,
        id: x.id,
        message: x.message,
        date: newDate,
        fullName: x.user.fullName
      }
    });

    return items;
  }
}

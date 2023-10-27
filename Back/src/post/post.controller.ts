import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetMyPostDto } from './dto/get-my-post.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiOperation({ summary: 'Create Post' })
  @Post('/create-post')
  @UseGuards(AuthGuard)
  async createPost(@Body() CreatePost: CreatePostDto): Promise<any> {
    return await this.postService.createPost(CreatePost);
  }

  @ApiOperation({ summary: 'List my posts' })
  @Post('/my-posts')
  @UseGuards(AuthGuard)
  async myPosts(@Body() GetPost: GetMyPostDto): Promise<any> {
    return await this.postService.getMyPosts(GetPost);
  }

  @ApiOperation({ summary: 'List all posts' })
  @Post('/all-posts')
  @UseGuards(AuthGuard)
  async allPosts(): Promise<any> {
    return await this.postService.allPosts();
  }
}

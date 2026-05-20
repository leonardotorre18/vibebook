import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { Payload } from '@repo/types';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create (@Body() post: CreatePostDTO, @Req() req: Request) {
    const { sub } = req.user as Payload
    return {
      post: await this.service.create(post, sub)
    }
  }

  @Get()
  async getAll () {
    return {
      posts: await this.service.getAll()
    }
  }

  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  async toggleLike(@Param('postId') postId: string, @Req() req: Request) {
    const { sub } = req.user as Payload
    return this.service.toggleLike(postId, sub);
  }
}

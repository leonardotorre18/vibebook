import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePost } from '@repo/types'

@Injectable()
export class PostsService {
  constructor(private repository: PrismaService) {}

  getAll() {
    return this.repository.post.findMany({})
  }

  getById(id: string) {
    return this.repository.post.findUnique({
      where: { id }
    })
  }

  async create({ body }: CreatePost, userId: string) {
    return this.repository.post.create({
      data: {
        body,
        userId
      }
    })
  }
}

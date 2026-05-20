import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePost } from '@repo/types'

@Injectable()
export class PostsService {
  constructor(private repository: PrismaService) { }

  getAll() {
    return this.repository.post.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
            lastname: true,
            username: true,
          }
        },
        likes: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
                lastname: true,
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
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

  async toggleLike(postId: string, userId: string) {
    const deleted = await this.repository.postLike.deleteMany({
      where: { userId, postId }
    });

    if (deleted.count === 0) {
      return this.repository.postLike.create({
        data: { userId, postId }
      });
    }

    return this.getById(postId)
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private repository: PrismaService) {}

  getByUsername(username: string) {
    return this.repository.user.findUnique({ where: { username } })
  }
}

import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { nanoid } from "nanoid";


@Injectable()
export class AuthService {
  constructor(
    private readonly repository: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async register({ email, name, password, lastname }: RegisterUserDto) {
    const username = await this.generateUniqueUsername(email)
    const user = await this.repository.user.create({
      data: {
        email,
        name,
        lastname,
        passwordHash: bcrypt.hashSync(password, 8),
        username,
      },
      omit: {
        passwordHash: true
      },
    })

    return {
      user: {
        email: user.email,
        name: user.name,
        sub: user.id,
        lastname: user.lastname,
      }
    }
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.repository.user.findUnique({ where: { email } })

    if (!user)
      throw new NotFoundException()

    if (!bcrypt.compareSync(password, user.passwordHash))
      throw new UnauthorizedException()

    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      lastname: user.lastname,
    }

    return {
      user: payload,
      accessToken: this.jwtService.sign(payload),
    }
  }

  private async generateUniqueUsername(email: string): Promise<string> {
    const base = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const existing = await this.repository.user.findUnique({ where: { username: base } });
    if (!existing) return base;

    return `${base}${nanoid(4)}`;
  }
}

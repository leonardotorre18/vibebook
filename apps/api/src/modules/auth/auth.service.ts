import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    private readonly service: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async register({ email, name, password, lastname }: RegisterUserDto) {
    const user = await this.service.user.create({
      data: {
        email,
        name,
        lastname,
        passwordHash: bcrypt.hashSync(password, 8)
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
    const user = await this.service.user.findUnique({ where: { email } })

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
}

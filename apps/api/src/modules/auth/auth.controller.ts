import { Body, Controller, Get, Post, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import type { Request, Response } from 'express'


@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) { }

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.service.register(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = await this.service.login(body);
    res.cookie('accessToken', auth.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      path: '/',
    })
    return auth
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    res.clearCookie('accessToken');
    const { user } = req;
    return {
      user
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const { user } = req;
    return {
      user
    }
  }
}
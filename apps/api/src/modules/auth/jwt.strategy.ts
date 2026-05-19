import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { Request } from 'express';
import { Payload } from '@repo/types';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req: Request) => req.cookies.accessToken,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
    });
  }

  async validate(payload: Payload) {
    return {
      lastname: payload.lastname,
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}

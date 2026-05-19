import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./jwt.config";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: []
})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './modules/storage/storage.module';
import { MediaModule } from './modules/media/media.module';
import { ConfigModule } from '@nestjs/config';
import dbEnv from './environments/db.env';
import azureEnv from './environments/azure.env';
import jwtEnv from './environments/jwt.env';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        dbEnv,
        azureEnv,
        jwtEnv,
      ]
    }),
    PrismaModule,
    StorageModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

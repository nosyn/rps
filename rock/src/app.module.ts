import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: z.object({
        POSTGRES_HOST: z.string().default('localhost'),
        POSTGRES_PORT: z.string().default('5432'),
        POSTGRES_USER: z.string().default('db_user'),
        POSTGRES_PASSWORD: z.string().default('db_password'),
        POSTGRES_DB: z.string().default('rps-db'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

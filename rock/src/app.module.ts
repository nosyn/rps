import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { ReferenceSourceModule } from './modules/reference-source/reference-source.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => {
        const schema = z.object({
          POSTGRES_HOST: z.string().default('localhost'),
          POSTGRES_PORT: z.string().default('5432'),
          POSTGRES_USER: z.string().default('db_user'),
          POSTGRES_PASSWORD: z.string().default('db_password'),
          POSTGRES_DB: z.string().default('rps-db'),
        });
        return schema.parse(config);
      },
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
      }),
    }),
    ReferenceSourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

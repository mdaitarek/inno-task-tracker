import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { configuration } from './config';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/common';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://mongo:27017/inno-task-tracker',
    ),
    HealthModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

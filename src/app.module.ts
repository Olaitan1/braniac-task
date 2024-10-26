import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [forwardRef(() => ConfigModule)],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoDbUri,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    CarsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

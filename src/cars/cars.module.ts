import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './car.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryConfigService } from 'src/config/cloudinary/cloudinary.config';
import { ConfigService } from 'src/config/config.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    AuthModule,
  ],
  providers: [CarsService, CloudinaryConfigService, ConfigService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}

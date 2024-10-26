import
{
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Body,
    Query,
    UseInterceptors,
    UploadedFiles,
    UseGuards,
    Req,
    BadRequestException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CarDetailsDto, CreateCarDto, FilterCarsDto } from './dto/cars.dto';
import { Car } from './car.schema';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserRole } from 'src/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CloudinaryConfigService } from '../config/cloudinary/cloudinary.config';

@Controller('/cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly cloudinaryService: CloudinaryConfigService,
  ) {}

  @Post()
  @Roles(UserRole.Seller)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @Req() req: Request,
  ): Promise<{ message: string; carId: string }> {
    const sellerId = req.user?.id;

    const car = await this.carsService.createCar(createCarDto, sellerId);
    return {
      message: 'Car listing created successfully',
      carId: car._id as string,
    };
  }

  @Post(':carId/images')
  @Roles(UserRole.Seller)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  async addCarImages(
    @Param('carId') carId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Check if files were uploaded
    if (!files || files.length === 0) {
      throw new BadRequestException('No files were uploaded.');
    }

    const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadImage(file),
    );
    const imageUrls: string[] = await Promise.all(uploadPromises);

    const car = await this.carsService.addImagesToCar(carId, imageUrls);
    return {
      message: 'Images added successfully',
      car,
    };
  }

  @Get()
  async getCars(@Query() filterDto: FilterCarsDto): Promise<Car[]> {
    return this.carsService.getCars(filterDto);
  }

    // @Get(':id')
    // async getCarById(@Param('id') id: string): Promise<Car> {
    //   return this.carsService.getCarById(id);
    // }
  @Get(':carId')
  async getCar(@Param('carId') carId: string): Promise<CarDetailsDto> {
    return this.carsService.getCarDetails(carId);
  }
}

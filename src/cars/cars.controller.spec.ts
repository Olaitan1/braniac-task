// import { Test, TestingModule } from '@nestjs/testing';
// import { CarsController } from './cars.controller';
// import { CarsService } from './cars.service';
// import { CloudinaryConfigService } from '../config/cloudinary/cloudinary.config';
// import { BadRequestException } from '@nestjs/common';
// import { FilterCarsDto } from './dto/cars.dto';
// import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
// import { Request } from 'express';

// class CreateCarDto {
//   @IsString() @IsNotEmpty() make: string;
//   @IsString() @IsNotEmpty() models: string;
//   @IsString() @IsNotEmpty() seller: string;
//   @IsNumber() @IsNotEmpty() year: number;
//   @IsNumber() @IsNotEmpty() mileage: number;
//   @IsNumber() @IsNotEmpty() price: number;
//   @IsString() @IsNotEmpty() description: string;
//   @IsBoolean() @IsNotEmpty() isAvailable: boolean;
// }

// describe('CarsController', () => {
//   let carsController: CarsController;
//   let carsService: CarsService;
//   let cloudinaryService: CloudinaryConfigService;

//   const mockCar = {
//     _id: 'mockCarId',
//     make: 'Toyota',
//     models: 'Corolla',
//     year: 2020,
//     seller: 'mockSellerId',
//     mileage: 50,
//     price: 30,
//     description: '',
//     isAvailable: false,
//   };

//   const mockCarsService = {
//     createCar: jest.fn().mockResolvedValue(mockCar),
//     addImagesToCar: jest.fn().mockResolvedValue(mockCar),
//     getCars: jest.fn().mockResolvedValue([mockCar]),
//     getCarDetails: jest.fn().mockResolvedValue(mockCar),
//   };

//   const mockCloudinaryService = {
//     uploadImage: jest
//       .fn()
//       .mockResolvedValue('http://mock-cloudinary-url.com/image.jpg'),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CarsController],
//       providers: [
//         { provide: CarsService, useValue: mockCarsService },
//         { provide: CloudinaryConfigService, useValue: mockCloudinaryService },
//       ],
//     }).compile();

//     carsController = module.get<CarsController>(CarsController);
//     carsService = module.get<CarsService>(CarsService);
//     cloudinaryService = module.get<CloudinaryConfigService>(
//       CloudinaryConfigService,
//     );
//   });

//   describe('createCar', () => {
//     it('should create a car successfully', async () => {
//       const createCarDto: CreateCarDto = {
//         make: 'Toyota',
//         models: 'Corolla',
//         year: 2020,
//         seller: 'mockSellerId',
//         mileage: 50,
//         price: 30,
//         isAvailable: false,
//         description: '',
//       };
//       const req = { user: { id: 'mockSellerId' } } as Request;

//       const result = await carsController.createCar(createCarDto, req);
//       expect(result).toEqual({
//         message: 'Car listing created successfully',
//         carId: mockCar._id,
//       });
//       expect(carsService.createCar).toHaveBeenCalledWith(
//         createCarDto,
//         req.user.id,
//       );
//     });

//     it('should handle missing required fields', async () => {
//       const createCarDto: Partial<CreateCarDto> = {
//         make: 'Toyota',
//         models: 'Corolla',
//         year: 2020,
//         seller: 'mockSellerId',
//         mileage: 50,
//         price: 30,
//         isAvailable: false,
//       };
//       const req = { user: { id: 'mockSellerId' } } as Request;

//       await expect(
//         carsController.createCar(createCarDto as CreateCarDto, req),
//       ).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('addCarImages', () => {
//     it('should add car images successfully', async () => {
//       const files = [
//         { buffer: Buffer.from('mock-image-data') },
//       ] as Express.Multer.File[];
//       const carId = 'mockCarId';

//       const result = await carsController.addCarImages(carId, files);
//       expect(result).toEqual({
//         message: 'Images added successfully',
//         car: mockCar,
//       });
//       expect(cloudinaryService.uploadImage).toHaveBeenCalledTimes(1);
//       expect(carsService.addImagesToCar).toHaveBeenCalledWith(
//         carId,
//         expect.any(Array),
//       );
//     });

//     it('should throw an error if no files are uploaded', async () => {
//       const carId = 'mockCarId';
//       await expect(carsController.addCarImages(carId, [])).rejects.toThrow(
//         BadRequestException,
//       );
//     });
//   });

//   describe('getCars', () => {
//     it('should return a list of cars', async () => {
//       const filterDto: FilterCarsDto = {};
//       const result = await carsController.getCars(filterDto);
//       expect(result).toEqual([mockCar]);
//       expect(carsService.getCars).toHaveBeenCalledWith(filterDto);
//     });
//   });

//   describe('getCar', () => {
//     it('should return car details successfully', async () => {
//       const carId = 'mockCarId';
//       const result = await carsController.getCar(carId);
//       expect(result).toEqual(mockCar);
//       expect(carsService.getCarDetails).toHaveBeenCalledWith(carId);
//     });

//     it('should throw an error for invalid carId', async () => {
//       const carId = 'invalidCarId';
//       carsService.getCarDetails = jest
//         .fn()
//         .mockRejectedValue(new BadRequestException('Car not found'));

//       await expect(carsController.getCar(carId)).rejects.toThrow(
//         BadRequestException,
//       );
//     });
//   });
// });

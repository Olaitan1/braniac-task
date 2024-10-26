import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './car.schema';
import { CarDetailsDto, CreateCarDto, FilterCarsDto, Order } from './dto/cars.dto';


@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async createCar(createCarDto: CreateCarDto, sellerId: string): Promise<Car> {
    const newCar = new this.carModel({
      ...createCarDto,
      seller: sellerId,
    });
    return newCar.save();
  }

  async addImagesToCar(carId: string, imageUrls: string[]): Promise<Car> {
    const car = await this.carModel.findById(carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    car.images.push(...imageUrls);
    return car.save();
  }

  async getCars(filterDto: FilterCarsDto): Promise<Car[]> {
    const {
      make,
      model,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      sortBy,
      order,
    } = filterDto;

    const filters: Record<string, any> = {};
    if (make) filters.make = make;
    if (model) filters.models = model;
    if (minYear || maxYear) filters.year = {};
    if (minYear) filters.year.$gte = minYear;
    if (maxYear) filters.year.$lte = maxYear;
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.$gte = minPrice;
    if (maxPrice) filters.price.$lte = maxPrice;
    if (minMileage || maxMileage) filters.mileage = {};
    if (minMileage) filters.mileage.$gte = minMileage;
    if (maxMileage) filters.mileage.$lte = maxMileage;

    const sortOptions: [string, 1 | -1][] = [];
    if (sortBy) {
      sortOptions.push([sortBy, order === Order.DESC ? -1 : 1]);
    }

    return this.carModel.find(filters).sort(sortOptions).exec();
  }

  // async getCarById(
  //   carId: string,
  // ): Promise<Car & { seller: { phoneNumber: string } }> {
  //   const car = await this.carModel
  //     .findById(carId)
  //     .populate('seller', 'phoneNumber')
  //     .exec();

  //   if (car && car.seller) {
  //     car.seller.phoneNumber = this.obfuscatePhoneNumber(
  //       car.seller.phoneNumber,
  //     );
  //   }

  //   return car;
  // }

  // private obfuscatePhoneNumber(phone: string): string {
  //   if (!phone) return '';
  //   return phone.replace(/(\d{3})(\d{3})(\d+)/, '$1****$3');
  // }

    async getCarDetails(carId: string): Promise<CarDetailsDto> {
    const car = await this.carModel.findById(carId).populate('seller').exec();

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const obfuscatedPhone = this.obfuscatePhoneNumber(car.seller.phoneNumber);

    return {
      make: car.make,
      model: car.models,
      year: car.year.toString(),
      mileage: car.mileage?.toString(),
      price: car.price.toString(),
      description: car.description,
      images: car.images,
      sellerInfo: {
        phone: obfuscatedPhone,
      },
      isAvailable: car.isAvailable,
    };
    }
  private obfuscatePhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone.replace(/(\d{3})(\d{3})(\d+)/, '$1****$3');
  }
}

import
    {
        IsString,
        IsNumber,
        IsNotEmpty,
        IsBoolean,
        IsOptional,
        IsEnum,
    } from 'class-validator';
import { Type } from 'class-transformer';


export enum SortBy {
  PRICE = 'price',
  MILEAGE = 'mileage',
  YEAR = 'year',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
export class CreateCarDto {
  @IsString() @IsNotEmpty() make: string;
  @IsString() @IsNotEmpty() models: string;
  @IsNumber() @IsNotEmpty() year: number;
  @IsNumber() @IsOptional() mileage: number;
  @IsNumber() @IsNotEmpty() price: number;
  @IsString() @IsOptional() description: string;
  @IsOptional() isAvailable: boolean;
}


export class FilterCarsDto {
  @IsString() @IsOptional() make?: string;
  @IsString() @IsOptional() model?: string;
  @Type(() => Number) @IsNumber() @IsOptional() minYear?: number;
  @Type(() => Number) @IsNumber() @IsOptional() maxYear?: number;
  @Type(() => Number) @IsNumber() @IsOptional() minPrice?: number;
  @Type(() => Number) @IsNumber() @IsOptional() maxPrice?: number;
  @Type(() => Number) @IsNumber() @IsOptional() minMileage?: number;
  @Type(() => Number) @IsNumber() @IsOptional() maxMileage?: number;
  @IsOptional() @IsEnum(SortBy) sortBy?: SortBy;
  @IsOptional() @IsEnum(Order) order?: Order;
}


export class SellerInfoDto {
  @IsString()
  phone: string; 
}

export class CarDetailsDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  mileage: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  images: string[];

  @IsString()
  sellerInfo: SellerInfoDto;

  @IsBoolean()
  isAvailable: boolean;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Schema()
export class Car extends Document {
  @Prop({ required: true }) make: string;
  @Prop({ required: true }) models: string;
  @Prop({ required: true }) year: number;
  @Prop() mileage: number;
  @Prop({ required: true }) price: number;
  @Prop() description: string;
  @Prop({ type: [String], default: [] }) images: string[];
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seller: User;
  @Prop({ default: true }) isAvailable: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);

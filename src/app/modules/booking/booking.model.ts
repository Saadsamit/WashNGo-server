import { Schema, model } from 'mongoose';
import TBooking from './booking.interface';

export const vehicleType = [
  'car',
  'truck',
  'SUV',
  'van',
  'motorcycle',
  'bus',
  'electricVehicle',
  'hybridVehicle',
  'bicycle',
  'tractor',
];

const bookingSchema = new Schema<TBooking>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'service',
      require: true,
      trim: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
      trim: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'slot',
      require: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: vehicleType,
      required: true,
      trim: true,
    },
    vehicleBrand: {
      type: String,
      require: true,
      trim: true,
    },
    vehicleModel: {
      type: String,
      require: true,
      trim: true,
    },
    manufacturingYear: {
      type: Number,
      require: true,
      trim: true,
    },
    registrationPlate: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const booking = model<TBooking>('booking', bookingSchema);

export default booking;

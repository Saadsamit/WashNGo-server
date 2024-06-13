import { Schema, model } from 'mongoose';
import TService from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    duration: { type: Number, required: true, trim: true },
    isDeleted: { type: Boolean, required: true, default: false, trim: true },
  },
  { timestamps: true },
);

const service = model<TService>('service', serviceSchema);

export default service;

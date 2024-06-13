import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'service',
      require: true,
      trim: true,
    },
    date: {
      type: String,
      require: true,
      trim: true,
    },
    startTime: {
      type: String,
      require: true,
      trim: true,
    },
    endTime: {
      type: String,
      require: true,
      trim: true,
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
      trim: true,
    },
  },
  { timestamps: true },
);

const slot = model<TSlot>('slot', slotSchema);

export default slot;

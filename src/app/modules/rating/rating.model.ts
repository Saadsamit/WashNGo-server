import { Schema, model } from 'mongoose';
import { TRating } from './rating.interface';

const ratingSchema = new Schema<TRating>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
      trim: true,
    },
    feedback: {
      type: String,
      require: true,
      trim: true,
    },
    rating: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const rating = model<TRating>('rating', ratingSchema);

export default rating;

import { Types } from 'mongoose';

type TRating = {
  user: Types.ObjectId;
  feedback: string;
  rating:number
};

export { TRating };

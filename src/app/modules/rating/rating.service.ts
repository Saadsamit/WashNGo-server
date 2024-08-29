import { Request } from 'express';
import rating from './rating.model';
import user from '../user/user.model';

const findAllRatingDB = async (req: Request) => {
  const email = req.query.email;
  const limit = Number(req.query.limit);
  let feedbackExsit = false;
  if (email) {
    const isUserExsit = await user.findOne({ email });
    if (isUserExsit) {
      const isFeedbackExsit = await rating.findOne({
        user: isUserExsit._id,
      });
      if (isFeedbackExsit) {
        feedbackExsit = true;
      }
    }
  }
  if (limit) {
    const data = await rating.find().populate('user').sort("-createdAt").limit(limit);
    return { data, feedbackExsit };
  }
  const data = await rating.find().populate('user');
  return { data, feedbackExsit };
};

const createRatingDB = async (req: Request) => {
  const { email } = req.user;
  const userData = await user.findOne({ email });
  const payload = req.body;
  const data = { ...payload, user: userData?._id };
  const newRating = await rating.create(data);
  return newRating;
};

export const ratingService = {
  findAllRatingDB,
  createRatingDB,
};

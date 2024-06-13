import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Tuser, TuserLogin } from './user.interface';
import user from './user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserDB = async (payload: Tuser) => {
  const newUser = new user(payload);
  await newUser.save();
  return await user.findById(newUser._id);
};

const userLogin = async (payload: TuserLogin) => {
  const isExist = await user.isUserExsit(payload.email);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await user.isPasswordMatched(payload.password, isExist.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'You enter wrong password');
  }
  payload.role = isExist.role;
  const token = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });
  
  const data = await user.findOne({ email: isExist.email });

  return { data, token };
};

export const userService = {
  createUserDB,
  userLogin,
};

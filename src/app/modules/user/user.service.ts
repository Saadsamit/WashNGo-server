import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Tuser, TuserLogin } from './user.interface';
import user from './user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { Request } from 'express';

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

  const userData = {
    email: payload.email,
    role: isExist.role,
  };
  const token = jwt.sign(userData, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const data = await user.findOne({ email: isExist.email });

  return { data, token };
};

const myAccountDB = async (req: Request) => {
  const { email } = req.user;
  const result = await user.findOne({ email });
  return result;
};

const updateAccountDB = async (req: Request) => {
  const { email } = req.user;
  const payload = req.body;
  const result = await user.findOneAndUpdate({ email }, payload);
  return result;
};

const allUserDB = async () => {
  const result = await user.find();
  return result;
};

const roleUpdateDB = async (req: Request) => {
  const id = req.params.id;
  const data = req.body;
  const result = await user.findByIdAndUpdate(id, data);
  return result;
};

export const userService = {
  createUserDB,
  userLogin,
  myAccountDB,
  updateAccountDB,
  allUserDB,
  roleUpdateDB,
};

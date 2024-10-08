import httpStatus from 'http-status';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import user from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ParseToken = req.headers.authorization;
    if (!ParseToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you dont have access token');
    }
    const token = ParseToken.split(' ')[1];

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decode;

    const isExist = await user.isUserExsit(email);

    if (!isExist) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not Exist');
    }

    if (roles.length && !roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    // console.log(isExist);
    if (role !== isExist.role) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Login Again');
    }

    req.user = {
      email,
      role,
      name: isExist?.name,
      address: isExist?.address,
      phone: isExist?.phone,
    };
    next();
  });
};

export default auth;

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
      throw new AppError(httpStatus.FORBIDDEN, 'you dont have access token');
    }
    const token = ParseToken.split(' ')[1];

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decode;

    const isExist = await user.isUserExsit(email);

    if (!isExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not Exist');
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = { email, role };
    next();
  });
};

export default auth;

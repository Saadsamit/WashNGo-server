import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserDB(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  res.send(data);
});

export const userController = {
  signup,
  login,
};

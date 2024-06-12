import { Request, Response, Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginSchemaValidation, userSchemaValidation } from './user.validation';
import user from './user.model';
import sendResponse from '../../utils/sendResponse';
import auth from '../../middlewares/auth';
import { User_Role } from './user.const';

const route = Router();

route.post(
  '/signup',
  validateRequest(userSchemaValidation),
  userController.signup,
);

route.get(
  '/user',
  auth(User_Role.user),
  async (req: Request, res: Response) => {
    const data = await user.find();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: '',
      data: data,
    });
  },
);

route.post(
  '/login',
  validateRequest(loginSchemaValidation),
  userController.login,
);

export const userRoute = route;

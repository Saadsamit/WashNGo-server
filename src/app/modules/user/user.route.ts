import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginSchemaValidation, userSchemaValidation } from './user.validation';

const route = Router();

route.post(
  '/signup',
 validateRequest(userSchemaValidation),
  userController.signup,
);

route.post(
  '/login',
  validateRequest(loginSchemaValidation),
  userController.login,
);

export const userRoute = route;

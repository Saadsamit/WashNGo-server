import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  loginSchemaValidation,
  updateAccountSchemaValidation,
  userSchemaValidation,
} from './user.validation';
import auth from '../../middlewares/auth';

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

route.get('/myAccount', auth(), userController.myAccount);

route.patch(
  '/updateAccount',
  auth(),
  validateRequest(updateAccountSchemaValidation),
  userController.updateAccount,
);

export const userRoute = route;

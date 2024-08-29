import { Router } from 'express';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.const';
import { ratingController } from './rating.controller';
import validateRequest from '../../middlewares/validateRequest';
import ratingSchemaValidation from './rating.validation';

const route = Router();

route.get('/all', ratingController.findAllRating);

route.post(
  '/',
  auth(User_Role.user),
  validateRequest(ratingSchemaValidation),
  ratingController.createRating,
);

export const ratingRoute = route;

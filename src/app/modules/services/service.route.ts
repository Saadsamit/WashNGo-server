import { Router } from 'express';
import { serviceController } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import serviceSchemaValidation from './service.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.const';

const route = Router();

route.post(
  '/',
  auth(User_Role.admin),
  validateRequest(serviceSchemaValidation),
  serviceController.createService,
);

route.get('/:id', serviceController.serviceFindById);

route.get('/', serviceController.findServices);

export const serviceRoute = route;

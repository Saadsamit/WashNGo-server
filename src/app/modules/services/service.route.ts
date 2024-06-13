import { Router } from 'express';
import { serviceController } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  serviceSchemaValidation,
  updateServiceSchemaValidation,
} from './service.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.const';
import slotSchemaValidation from '../slots/slot.validation';

const route = Router();

route.post(
  '/',
  auth(User_Role.admin),
  validateRequest(serviceSchemaValidation),
  serviceController.createService,
);

route.get('/:id', serviceController.serviceFindById);

route.get('/', serviceController.findServices);

route.put(
  '/:id',
  auth(User_Role.admin),
  validateRequest(updateServiceSchemaValidation),
  serviceController.updateServices,
);

route.delete('/:id', auth(User_Role.admin), serviceController.deleteServices);

route.post(
  '/slots',
  auth(User_Role.admin),
  validateRequest(slotSchemaValidation),
  serviceController.createSlot,
);

export const serviceRoute = route;

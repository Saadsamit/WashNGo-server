import { Router } from 'express';
import { slotController } from './slot.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.const';

const route = Router();

route.get('/availability', slotController.findSlot);

route.put(
  '/updateSlotStatus/:id',
  auth(User_Role.admin),
  slotController.updateSlotStatus,
);

export const slotRoute = route;

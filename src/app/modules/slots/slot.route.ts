import { Router } from 'express';
import { slotController } from './slot.controller';

const route = Router();

route.get('/availability', slotController.findSlot);

export const slotRoute = route;

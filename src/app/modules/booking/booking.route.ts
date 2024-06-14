import { Router } from 'express';
import { bookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import bookingSchemaValidation from './booking.validation';

const route = Router();

route.post(
  '/bookings',
  auth(User_Role.user),
  validateRequest(bookingSchemaValidation),
  bookingController.createBooking,
);

route.get('/bookings', auth(User_Role.admin), bookingController.allBooking);

route.get('/my-bookings', auth(User_Role.user), bookingController.userBooking);

export const bookingRoute = route;

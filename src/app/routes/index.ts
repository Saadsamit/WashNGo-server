import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { serviceRoute } from '../modules/services/service.route';
import { slotRoute } from '../modules/slots/slot.route';
import { bookingRoute } from '../modules/booking/booking.route';
import basicRoute from '../modules/basic';
import { ratingRoute } from '../modules/rating/rating.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: basicRoute,
  },
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/services',
    route: serviceRoute,
  },
  {
    path: '/slots',
    route: slotRoute,
  },
  {
    path: '/rating',
    route: ratingRoute,
  },
  {
    path: '/',
    route: bookingRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

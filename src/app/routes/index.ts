import { Router } from 'express';
import basicRoute from '../modules/basic';
import { userRoute } from '../modules/user/user.route';
import { serviceRoute } from '../modules/services/service.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

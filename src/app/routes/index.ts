import { Router } from 'express';
import basicRoute from '../modules/basic';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: basicRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router

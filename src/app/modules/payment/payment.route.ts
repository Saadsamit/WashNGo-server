import { Router } from 'express';
import { paymentController } from './payment.controller';

const route = Router();

route.post('/confirm', paymentController.confirmPayment);

route.post('/fail', paymentController.failPayment);

route.get('/cancel/:id', paymentController.cancelPayment);

export const paymentRoute = route;

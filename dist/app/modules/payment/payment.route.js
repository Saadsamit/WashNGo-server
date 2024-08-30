"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const route = (0, express_1.Router)();
route.post('/confirm', payment_controller_1.paymentController.confirmPayment);
route.post('/fail', payment_controller_1.paymentController.failPayment);
route.get('/cancel/:id', payment_controller_1.paymentController.cancelPayment);
exports.paymentRoute = route;

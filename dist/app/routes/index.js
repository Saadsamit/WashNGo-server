"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const service_route_1 = require("../modules/services/service.route");
const slot_route_1 = require("../modules/slots/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const basic_1 = __importDefault(require("../modules/basic"));
const rating_route_1 = require("../modules/rating/rating.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/',
        route: basic_1.default,
    },
    {
        path: '/auth',
        route: user_route_1.userRoute,
    },
    {
        path: '/services',
        route: service_route_1.serviceRoute,
    },
    {
        path: '/slots',
        route: slot_route_1.slotRoute,
    },
    {
        path: '/rating',
        route: rating_route_1.ratingRoute,
    },
    {
        path: '/payment',
        route: payment_route_1.paymentRoute,
    },
    {
        path: '/',
        route: booking_route_1.bookingRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

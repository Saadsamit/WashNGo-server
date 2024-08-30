"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const rating_controller_1 = require("./rating.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rating_validation_1 = __importDefault(require("./rating.validation"));
const route = (0, express_1.Router)();
route.get('/all', rating_controller_1.ratingController.findAllRating);
route.post('/', (0, auth_1.default)(user_const_1.User_Role.user), (0, validateRequest_1.default)(rating_validation_1.default), rating_controller_1.ratingController.createRating);
exports.ratingRoute = route;

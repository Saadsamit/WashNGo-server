"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoute = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const route = (0, express_1.Router)();
route.get('/availability', slot_controller_1.slotController.findSlot);
route.get('/:id', slot_controller_1.slotController.findASlot);
route.put('/updateSlotStatus/:id', (0, auth_1.default)(user_const_1.User_Role.admin), slot_controller_1.slotController.updateSlotStatus);
exports.slotRoute = route;

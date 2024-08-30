"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoute = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const slot_validation_1 = __importDefault(require("../slots/slot.validation"));
const route = (0, express_1.Router)();
route.post('/', (0, auth_1.default)(user_const_1.User_Role.admin), (0, validateRequest_1.default)(service_validation_1.serviceSchemaValidation), service_controller_1.serviceController.createService);
route.get('/:id', service_controller_1.serviceController.serviceFindById);
route.get('/', service_controller_1.serviceController.findServices);
route.put('/:id', (0, auth_1.default)(user_const_1.User_Role.admin), (0, validateRequest_1.default)(service_validation_1.updateServiceSchemaValidation), service_controller_1.serviceController.updateServices);
route.delete('/:id', (0, auth_1.default)(user_const_1.User_Role.admin), service_controller_1.serviceController.deleteServices);
route.post('/slots', (0, auth_1.default)(user_const_1.User_Role.admin), (0, validateRequest_1.default)(slot_validation_1.default), service_controller_1.serviceController.createSlot);
route.get('/slots/:id/:date', service_controller_1.serviceController.serviceSlots);
exports.serviceRoute = route;

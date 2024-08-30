"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const slot_service_1 = require("./slot.service");
const http_status_1 = __importDefault(require("http-status"));
const findSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const service = (_a = req.query) === null || _a === void 0 ? void 0 : _a.serviceId;
    const date = (_b = req.query) === null || _b === void 0 ? void 0 : _b.date;
    let query = {};
    if (service) {
        query = { service };
    }
    if (date) {
        query = Object.assign(Object.assign({}, query), { date });
    }
    const result = yield slot_service_1.slotService.findSlotDB(query);
    (0, sendResponse_1.default)(res, {
        success: result.length > 0 ? true : false,
        statusCode: result.length > 0 ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result.length > 0
            ? 'Available slots retrieved successfully'
            : 'No Data Found',
        data: result.length > 0 ? result : [],
    });
}));
const updateSlotStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_service_1.slotService.updateSlotStatusDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'slot status update successfully',
        data: result,
    });
}));
const findASlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_service_1.slotService.findASlotDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'find slot successfully',
        data: result,
    });
}));
exports.slotController = {
    findSlot,
    updateSlotStatus,
    findASlot,
};

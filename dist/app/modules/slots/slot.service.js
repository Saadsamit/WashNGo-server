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
exports.slotService = void 0;
const slot_model_1 = __importDefault(require("./slot.model"));
const findSlotDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield slot_model_1.default
        .find(Object.assign({ isBooked: { $ne: 'booked' } }, query))
        .populate('service');
});
const updateSlotStatusDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const isBooked = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.status;
    return yield slot_model_1.default.findByIdAndUpdate(id, { isBooked });
});
const findASlotDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    return yield slot_model_1.default.findById(id).populate('service');
});
exports.slotService = {
    findSlotDB,
    updateSlotStatusDB,
    findASlotDB,
};

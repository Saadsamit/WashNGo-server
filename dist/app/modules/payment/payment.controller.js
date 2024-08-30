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
exports.paymentController = void 0;
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const slot_model_1 = __importDefault(require("../slots/slot.model"));
const config_1 = __importDefault(require("../../config"));
const confirmPayment = (req, res) => {
    res.redirect(`${config_1.default.url}/payment/success`);
};
const failPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.query) === null || _a === void 0 ? void 0 : _a.bookingId;
    try {
        const findBooking = yield booking_model_1.default.findById(id);
        yield slot_model_1.default.findByIdAndUpdate(findBooking === null || findBooking === void 0 ? void 0 : findBooking.slot, { isBooked: 'available' });
        yield booking_model_1.default.findByIdAndDelete(id);
        res.redirect(`${config_1.default.url}/payment/fail`);
    }
    catch (err) {
        next(err);
    }
});
const cancelPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const findBooking = yield booking_model_1.default.findById(id);
        if (!findBooking) {
            res.json({ success: true });
            return;
        }
        yield slot_model_1.default.findByIdAndUpdate(findBooking === null || findBooking === void 0 ? void 0 : findBooking.slot, { isBooked: 'available' });
        yield booking_model_1.default.findByIdAndDelete(id);
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.paymentController = { confirmPayment, failPayment, cancelPayment };

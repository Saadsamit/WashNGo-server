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
exports.bookingService = void 0;
const service_model_1 = __importDefault(require("../services/service.model"));
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const slot_model_1 = __importDefault(require("../slots/slot.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const createBookingDB = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, address, phone } = req.user;
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const isServiceExist = yield service_model_1.default.findOne({
            _id: payload.service,
            isDeleted: false,
        });
        if (!isServiceExist) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The service not found.');
        }
        const isSlotExist = yield slot_model_1.default.findOne({
            _id: payload.slot,
            service: payload.service,
        });
        const customer = yield user_model_1.default.findOne({ email });
        if (!isSlotExist) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The slot not found.');
        }
        else if (!customer) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The user not found.');
        }
        else if (isSlotExist.isBooked === 'booked') {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The slot already booked');
        }
        payload.customer = customer._id;
        const updateStatus = yield slot_model_1.default.findByIdAndUpdate(payload.slot, { isBooked: 'booked' }, { new: true, session });
        if (!updateStatus) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update slot');
        }
        const newBooking = new booking_model_1.default(payload);
        const createBooking = newBooking.save({ session });
        if (!createBooking) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to make booking');
        }
        const price = Number(isServiceExist === null || isServiceExist === void 0 ? void 0 : isServiceExist.price) * 100;
        const bookingData = yield booking_model_1.default
            .findById((yield createBooking)._id)
            .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
            .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
            .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
            .session(session);
        const formData = {
            signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
            store_id: 'aamarpaytest',
            tran_id: bookingData === null || bookingData === void 0 ? void 0 : bookingData._id,
            success_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/payment/confirm`,
            fail_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/payment/fail?bookingId=${bookingData === null || bookingData === void 0 ? void 0 : bookingData._id}`,
            cancel_url: `${config_1.default.url}/payment/cancel/${bookingData === null || bookingData === void 0 ? void 0 : bookingData._id}`,
            amount: price,
            currency: 'BDT',
            desc: 'Merchant Registration Payment',
            cus_name: name,
            cus_email: email,
            cus_add1: address,
            cus_add2: 'N/A',
            cus_city: 'N/A',
            cus_state: 'N/A',
            cus_postcode: 'N/A',
            cus_country: 'N/A',
            cus_phone: phone,
            type: 'json',
        };
        const { data } = yield axios_1.default.post('https://sandbox.aamarpay.com/jsonpost.php', formData);
        if (data.result !== 'true') {
            let errorMessage = '';
            for (const key in data) {
                errorMessage += data[key] + '. ';
            }
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, errorMessage);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const allBookingDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBooking = yield booking_model_1.default
        .find()
        .sort('-createdAt')
        .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
        .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
        .populate({ path: 'service', select: '-createdAt -updatedAt -__v' });
    return allBooking;
});
const userBookingDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const date = (0, moment_1.default)(new Date(Date.now())).format('L');
    const mode = (_b = req.query) === null || _b === void 0 ? void 0 : _b.mode;
    const customer = yield user_model_1.default.findOne({ email });
    let query = {};
    if (mode === 'past') {
        query = {
            bookingDate: {
                $lt: date,
            },
        };
    }
    if (mode === 'upcoming') {
        query = {
            bookingDate: {
                $gte: date,
            },
        };
    }
    if (mode === 'nav') {
        const bookingList = yield booking_model_1.default
            .findOne({
            customer: customer === null || customer === void 0 ? void 0 : customer._id,
            bookingDate: {
                $gte: date,
            },
        })
            .select('slot')
            .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
            .sort('-bookingDate');
        return bookingList;
    }
    const bookingList = yield booking_model_1.default
        .find(Object.assign({ customer: customer === null || customer === void 0 ? void 0 : customer._id }, query))
        .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
        .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
        .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
        .sort('-bookingDate');
    return bookingList;
});
exports.bookingService = {
    createBookingDB,
    allBookingDB,
    userBookingDB,
};

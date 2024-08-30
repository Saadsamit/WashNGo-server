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
exports.services = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const service_model_1 = __importDefault(require("./service.model"));
const slot_model_1 = __importDefault(require("../slots/slot.model"));
const moment_1 = __importDefault(require("moment"));
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload === null || payload === void 0 ? void 0 : payload.isDeleted) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'you cant give isDeleted value true set the value false.');
    }
    const newUser = new service_model_1.default(payload);
    return yield newUser.save();
});
const FindByIdDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.default.findOne({ _id, isDeleted: false });
});
const FindServicesDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const limit = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit);
    const sort = ((_c = (_b = req.query) === null || _b === void 0 ? void 0 : _b.sort) === null || _c === void 0 ? void 0 : _c.split(',').join(' ')) || '-createdAt';
    const search = (_d = req.query) === null || _d === void 0 ? void 0 : _d.search;
    let query = {};
    if (search) {
        query = { name: { $regex: search, $options: 'i' } };
    }
    const serviceQuery = service_model_1.default.find(Object.assign({ isDeleted: false }, query)).sort(sort);
    if (limit) {
        return yield serviceQuery.limit(limit);
    }
    return yield serviceQuery;
});
const updateServiceDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.default.findById({ _id, isDeleted: false });
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The service not found.');
    }
    else if (payload === null || payload === void 0 ? void 0 : payload.isDeleted) {
        throw new appError_1.default(http_status_1.default.NOT_MODIFIED, 'you cant modify isDeleted property.');
    }
    yield service_model_1.default.findByIdAndUpdate({ _id }, payload);
    return yield service_model_1.default.findById(_id);
});
const deleteServiceDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.default.findOne({ _id, isDeleted: false });
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The service not found.');
    }
    yield service_model_1.default.findByIdAndUpdate({ _id }, { isDeleted: true });
    return yield service_model_1.default.findById(_id);
});
const createSlotDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if ((payload === null || payload === void 0 ? void 0 : payload.isBooked) && (payload === null || payload === void 0 ? void 0 : payload.isBooked) !== 'available')
        payload.isBooked = 'available';
    const isExist = yield service_model_1.default.findOne({
        _id: payload.service,
        isDeleted: false,
    });
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The service not found.');
    }
    const date = new Date(payload.date).setHours(0, 0, 0, 0);
    const curDate = new Date(Date.now()).setHours(0, 0, 0, 0);
    if (date < curDate) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'select current date or upcoming date');
    }
    const startTimeHour = Number(payload.startTime.split(':')[0]);
    const startTimeMin = Number(payload.startTime.split(':')[1]);
    const endTimeHour = Number(payload.endTime.split(':')[0]);
    const endTimeMin = Number(payload.endTime.split(':')[1]);
    if ((0, moment_1.default)((0, moment_1.default)().format('HH:mm'), 'HH:mm').isSameOrAfter((0, moment_1.default)(payload === null || payload === void 0 ? void 0 : payload.startTime, 'HH:mm'))) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'start Time must be bigger then latest Time');
    }
    if (startTimeHour > endTimeHour) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'endTime must be bigger then startTime');
    }
    else if (startTimeHour === endTimeHour) {
        if (startTimeMin === endTimeMin || startTimeMin > endTimeMin) {
            throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'endTime must be bigger then startTime');
        }
    }
    const startMin = startTimeHour * 60 + startTimeMin;
    const endMin = endTimeHour * 60 + endTimeMin;
    let totalDuration = endMin - startMin;
    if (isExist.duration > totalDuration) {
        throw new appError_1.default(http_status_1.default.NOT_ACCEPTABLE, `Time must be bigger then duration. The duration is ${isExist.duration}`);
    }
    totalDuration = Math.floor(totalDuration / isExist.duration);
    const totalSlot = [...Array(totalDuration).keys()];
    const slots = [];
    totalSlot.forEach((val) => {
        const currentValue = Number(val);
        const startTimeMinutes = startMin + currentValue * isExist.duration;
        const startHour = Math.floor(startTimeMinutes / 60);
        const startMinInHour = startTimeMinutes % 60;
        const endTimeMinutes = startMin + (currentValue + 1) * isExist.duration;
        const endHour = Math.floor(endTimeMinutes / 60);
        const endMinInHour = endTimeMinutes % 60;
        const TimeStart = `${startHour.toString().padStart(2, '0')}:${startMinInHour.toString().padStart(2, '0')}`;
        const TimeEnd = `${endHour.toString().padStart(2, '0')}:${endMinInHour.toString().padStart(2, '0')}`;
        const myData = {
            service: payload.service,
            date: payload.date,
            startTime: TimeStart,
            endTime: TimeEnd,
        };
        slots.push(myData);
    });
    return yield slot_model_1.default.insertMany(slots);
});
const serviceSlotsDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const date = (0, moment_1.default)(req.params.date).format('L');
    const isExist = yield service_model_1.default.find({ _id: serviceId, isDeleted: false });
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'The service not found.');
    }
    const result = yield slot_model_1.default.find({
        service: serviceId,
        date: {
            $eq: date,
        },
    });
    return result;
});
exports.services = {
    createUserDB,
    FindByIdDB,
    FindServicesDB,
    updateServiceDB,
    deleteServiceDB,
    createSlotDB,
    serviceSlotsDB,
};

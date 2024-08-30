"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleType = void 0;
const mongoose_1 = require("mongoose");
exports.vehicleType = [
    'car',
    'truck',
    'SUV',
    'van',
    'motorcycle',
    'bus',
    'electricVehicle',
    'hybridVehicle',
    'bicycle',
    'tractor',
];
const bookingSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'service',
        require: true,
        trim: true,
    },
    bookingDate: {
        type: Date,
        require: true,
        trim: true,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
        trim: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'slot',
        require: true,
        trim: true,
    },
    vehicleType: {
        type: String,
        enum: exports.vehicleType,
        required: true,
        trim: true,
    },
    vehicleBrand: {
        type: String,
        require: true,
        trim: true,
    },
    vehicleModel: {
        type: String,
        require: true,
        trim: true,
    },
    manufacturingYear: {
        type: Number,
        require: true,
        trim: true,
    },
    registrationPlate: {
        type: String,
        require: true,
        trim: true,
    },
}, { timestamps: true });
const booking = (0, mongoose_1.model)('booking', bookingSchema);
exports.default = booking;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'service',
        require: true,
        trim: true,
    },
    date: {
        type: Date,
        require: true,
        trim: true,
    },
    startTime: {
        type: String,
        require: true,
        trim: true,
    },
    endTime: {
        type: String,
        require: true,
        trim: true,
    },
    isBooked: {
        type: String,
        enum: ['available', 'booked', 'canceled'],
        default: 'available',
        trim: true,
    },
}, { timestamps: true });
const slot = (0, mongoose_1.model)('slot', slotSchema);
exports.default = slot;

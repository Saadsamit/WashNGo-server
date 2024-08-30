"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    duration: { type: Number, required: true, trim: true },
    isDeleted: { type: Boolean, required: true, default: false, trim: true },
}, { timestamps: true });
const service = (0, mongoose_1.model)('service', serviceSchema);
exports.default = service;

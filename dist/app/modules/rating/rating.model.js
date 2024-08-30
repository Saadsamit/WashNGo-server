"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
        trim: true,
    },
    feedback: {
        type: String,
        require: true,
        trim: true,
    },
    rating: {
        type: Number,
        require: true,
        trim: true,
    },
}, { timestamps: true });
const rating = (0, mongoose_1.model)('rating', ratingSchema);
exports.default = rating;

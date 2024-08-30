"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ratingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        feedback: zod_1.z.string().trim(),
        rating: zod_1.z.number(),
    }),
});
exports.default = ratingSchemaValidation;

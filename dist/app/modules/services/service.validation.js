"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSchemaValidation = exports.serviceSchemaValidation = void 0;
const zod_1 = require("zod");
const serviceSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        duration: zod_1.z.number(),
    }),
});
exports.serviceSchemaValidation = serviceSchemaValidation;
const updateServiceSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        duration: zod_1.z.number().optional(),
    }),
});
exports.updateServiceSchemaValidation = updateServiceSchemaValidation;

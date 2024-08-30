"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
const slotSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string().trim(),
        date: zod_1.z.string(),
        startTime: zod_1.z.string().refine((val) => timePattern.test(val), {
            message: 'Ensures the time is in HH:MM format (24-hour)',
        }),
        endTime: zod_1.z.string().refine((val) => timePattern.test(val), {
            message: 'Ensures the time is in HH:MM format (24-hour)',
        }),
    }),
});
exports.default = slotSchemaValidation;

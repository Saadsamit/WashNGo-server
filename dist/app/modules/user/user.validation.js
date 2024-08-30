"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemaValidation = exports.updateAccountSchemaValidation = exports.userSchemaValidation = void 0;
const zod_1 = require("zod");
const userSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
exports.userSchemaValidation = userSchemaValidation;
const loginSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
    }),
});
exports.loginSchemaValidation = loginSchemaValidation;
const updateAccountSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
exports.updateAccountSchemaValidation = updateAccountSchemaValidation;

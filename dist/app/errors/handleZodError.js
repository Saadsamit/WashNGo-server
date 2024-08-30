"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorMessages = err.issues.map((issues) => {
        return {
            path: issues === null || issues === void 0 ? void 0 : issues.path[(issues === null || issues === void 0 ? void 0 : issues.path.length) - 1],
            message: issues === null || issues === void 0 ? void 0 : issues.message,
        };
    });
    return { statusCode: 400, message: 'Validation Error', errorMessages };
};
exports.default = handleZodError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a, _b;
    const errorMessages = [
        {
            path: '',
            message: (_a = err === null || err === void 0 ? void 0 : err.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg,
        },
    ];
    return {
        statusCode: 400,
        message: (_b = err === null || err === void 0 ? void 0 : err.errorResponse) === null || _b === void 0 ? void 0 : _b.errmsg,
        errorMessages,
    };
};
exports.default = handleDuplicateError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    if (!(data === null || data === void 0 ? void 0 : data.token))
        delete data.token;
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(data);
};
exports.default = sendResponse;

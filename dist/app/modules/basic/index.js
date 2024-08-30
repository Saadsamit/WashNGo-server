"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("../../config"));
const route = (0, express_1.Router)();
route.get('/', (req, res) => {
    res.json({
        success: true,
        massage: `server is running ${config_1.default.port}`,
    });
});
const basicRoute = route;
exports.default = basicRoute;

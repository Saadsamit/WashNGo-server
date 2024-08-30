"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../errors/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const ParseToken = req.headers.authorization;
        if (!ParseToken) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'you dont have access token');
        }
        const token = ParseToken.split(' ')[1];
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { email, role } = decode;
        const isExist = yield user_model_1.default.isUserExsit(email);
        if (!isExist) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User not Exist');
        }
        if (roles.length && !roles.includes(role)) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        // console.log(isExist);
        if (role !== isExist.role) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Login Again');
        }
        req.user = {
            email,
            role,
            name: isExist === null || isExist === void 0 ? void 0 : isExist.name,
            address: isExist === null || isExist === void 0 ? void 0 : isExist.address,
            phone: isExist === null || isExist === void 0 ? void 0 : isExist.phone,
        };
        next();
    }));
};
exports.default = auth;

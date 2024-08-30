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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUserDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoginData = req.body;
    const { data, token } = yield user_service_1.userService.userLogin(userLoginData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        token: token,
        data: data,
    });
}));
const myAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.userService.myAccountDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User get successfully',
        data: data,
    });
}));
const updateAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.userService.updateAccountDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User update successfully',
        data: data,
    });
}));
const allUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.userService.allUserDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User get successfully',
        data: data,
    });
}));
const roleUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.userService.roleUpdateDB(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User role update successfully',
        data: data,
    });
}));
exports.userController = {
    signup,
    login,
    myAccount,
    updateAccount,
    allUser,
    roleUpdate,
};

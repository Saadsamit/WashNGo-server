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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default(payload);
    yield newUser.save();
    return yield user_model_1.default.findById(newUser._id);
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.isUserExsit(payload.email);
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!(yield user_model_1.default.isPasswordMatched(payload.password, isExist.password))) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'You enter wrong password');
    }
    const userData = {
        email: payload.email,
        role: isExist.role,
    };
    const token = jsonwebtoken_1.default.sign(userData, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const data = yield user_model_1.default.findOne({ email: isExist.email });
    return { data, token };
});
const myAccountDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield user_model_1.default.findOne({ email });
    return result;
});
const updateAccountDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const payload = req.body;
    const result = yield user_model_1.default.findOneAndUpdate({ email }, payload);
    return result;
});
const allUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const roleUpdateDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield user_model_1.default.findByIdAndUpdate(id, data);
    return result;
});
exports.userService = {
    createUserDB,
    userLogin,
    myAccountDB,
    updateAccountDB,
    allUserDB,
    roleUpdateDB,
};

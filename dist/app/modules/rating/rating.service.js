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
exports.ratingService = void 0;
const rating_model_1 = __importDefault(require("./rating.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const findAllRatingDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const limit = Number(req.query.limit);
    let feedbackExsit = false;
    if (email) {
        const isUserExsit = yield user_model_1.default.findOne({ email });
        if (isUserExsit) {
            const isFeedbackExsit = yield rating_model_1.default.findOne({
                user: isUserExsit._id,
            });
            if (isFeedbackExsit) {
                feedbackExsit = true;
            }
        }
    }
    if (limit) {
        const data = yield rating_model_1.default.find().populate('user').sort("-createdAt").limit(limit);
        return { data, feedbackExsit };
    }
    const data = yield rating_model_1.default.find().populate('user');
    return { data, feedbackExsit };
});
const createRatingDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const userData = yield user_model_1.default.findOne({ email });
    const payload = req.body;
    const data = Object.assign(Object.assign({}, payload), { user: userData === null || userData === void 0 ? void 0 : userData._id });
    const newRating = yield rating_model_1.default.create(data);
    return newRating;
});
exports.ratingService = {
    findAllRatingDB,
    createRatingDB,
};

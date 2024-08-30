"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    Bcrypt_Hash_Round: process.env.BCRYPT_HASH_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    url: process.env.NODE_ENV === 'production'
        ? process.env.SERVER_URL
        : process.env.LOCAL_URL,
};
exports.default = config;

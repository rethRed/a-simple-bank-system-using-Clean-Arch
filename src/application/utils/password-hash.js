"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword(password) {
    const salt = await bcrypt_1.default.genSalt(10);
    return await bcrypt_1.default.hash(password, salt);
}
exports.hashPassword = hashPassword;
async function compare(password, hashPassword) {
    return await bcrypt_1.default.compare(password, hashPassword);
}
exports.compare = compare;

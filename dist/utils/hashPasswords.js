"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareWithHash = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, saltRounds);
}
exports.hashPassword = hashPassword;
function compareWithHash(password, hash) {
    console.log(password, hash);
    console.log(bcryptjs_1.default.compareSync(password, hash));
    return bcryptjs_1.default.compareSync(password, hash);
}
exports.compareWithHash = compareWithHash;

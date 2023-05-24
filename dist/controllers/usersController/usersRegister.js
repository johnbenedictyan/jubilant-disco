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
const createUserToken_1 = __importDefault(require("../../utils/auth/createUserToken"));
const userCreatePrisma_1 = __importDefault(require("../../utils/db/user/userCreatePrisma"));
const hashPasswords_1 = require("../../utils/hashPasswords");
const userViewer_1 = __importDefault(require("../../view/userViewer"));
/**
 * Users controller that registers the user with information given in the body of the request.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function usersRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, username, role } = req.body.user;
        try {
            // Hash password
            const hashed = (0, hashPasswords_1.hashPassword)(password);
            // Create the new user on the database
            const user = yield (0, userCreatePrisma_1.default)(username, email, hashed, role);
            // Create the authentication token for future use
            const token = (0, createUserToken_1.default)(user);
            // Create the user view with the authentication token
            const userView = (0, userViewer_1.default)(user, token);
            return res.status(201).json(userView);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = usersRegister;

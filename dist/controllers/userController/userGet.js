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
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const userViewer_1 = __importDefault(require("../../view/userViewer"));
/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function userGet(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(404);
            // Create the authentication token
            const token = (0, createUserToken_1.default)(currentUser);
            // Create the user view with the authentication token
            const response = (0, userViewer_1.default)(currentUser, token);
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = userGet;

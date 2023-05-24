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
const userUpdatePrisma_1 = __importDefault(require("../../utils/db/user/userUpdatePrisma"));
const userViewer_1 = __importDefault(require("../../view/userViewer"));
/**
 * User controller that updates the current user with info given on the body of the request.
 * @param req Request with authenticated user in the auth property and new information on the body of the request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function userUpdate(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        const info = req.body.user;
        try {
            // Get current user
            const user = yield (0, userUpdatePrisma_1.default)(username, info);
            if (!user)
                return res.sendStatus(404);
            // Create the user token for future authentications
            const token = (0, createUserToken_1.default)(user);
            // Create the user view with the authenticated token
            const userView = (0, userViewer_1.default)(user, token);
            return res.json(userView);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = userUpdate;

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
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const userUnFollowProfilePrisma_1 = __importDefault(require("../../utils/db/user/userUnFollowProfilePrisma"));
const profileViewer_1 = __importDefault(require("../../view/profileViewer"));
/**
 * Profile controller that removes the username in the parameters to the current user followers list.
 * @param req Request with an authenticated user in the auth property
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function unFollowProfile(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        const currentUsername = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(currentUsername);
            if (!currentUser)
                return res.sendStatus(401);
            // Get the desired profile
            const profile = yield (0, userUnFollowProfilePrisma_1.default)(currentUser, username);
            // Create the profile view
            const profileView = (0, profileViewer_1.default)(profile, currentUser);
            return res.json({ profile: profileView });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = unFollowProfile;

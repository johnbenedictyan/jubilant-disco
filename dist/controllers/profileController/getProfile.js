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
const profileViewer_1 = __importDefault(require("../../view/profileViewer"));
/**
 * Profile controller that takes the username in the parameters and returns its profile.
 * With an optional authenticated user.
 * @param req Request with an optional authenticated user.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function getProfile(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.params;
        const currentUsername = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username; // The current user's username
        try {
            // Get current user from database
            const currentUser = yield (0, userGetPrisma_1.default)(currentUsername);
            // Get the desired profile
            const profile = yield (0, userGetPrisma_1.default)(username);
            if (!profile)
                return res.sendStatus(404);
            // Create the profile view
            const profileView = currentUser
                ? (0, profileViewer_1.default)(profile, currentUser)
                : (0, profileViewer_1.default)(profile);
            return res.json({ profile: profileView });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = getProfile;

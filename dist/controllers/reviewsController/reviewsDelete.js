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
const reviewDeletePrisma_1 = __importDefault(require("../../utils/db/review/reviewDeletePrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const reviewViewer_1 = __importDefault(require("../../view/reviewViewer"));
/**
 * Review controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function reviewsDelete(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        const userName = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(userName);
            if (!currentUser)
                return res.sendStatus(401);
            // Delete the review
            const review = yield (0, reviewDeletePrisma_1.default)(slug);
            // Create the deleted review view
            const reviewView = (0, reviewViewer_1.default)(review, currentUser);
            return res.status(200).json({ review: reviewView });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = reviewsDelete;

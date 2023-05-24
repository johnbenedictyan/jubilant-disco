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
const reviewLikePrisma_1 = __importDefault(require("../../utils/db/review/reviewLikePrisma"));
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
function reviewsLike(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        const username = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user.username;
        try {
            // Get current user
            let currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(401);
            // Like the review
            const review = yield (0, reviewLikePrisma_1.default)(currentUser, slug);
            if (!review)
                return res.sendStatus(404);
            // Retrieve current user after update of its liked reviews
            currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(500); // The user should not have disappeared after having liked an review
            // Create review view
            const reviewView = (0, reviewViewer_1.default)(review, currentUser);
            return res.json({ review: reviewView });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = reviewsLike;

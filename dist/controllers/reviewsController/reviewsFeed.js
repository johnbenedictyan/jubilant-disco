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
const reviewFeedPrisma_1 = __importDefault(require("../../utils/db/review/reviewFeedPrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const reviewViewer_1 = __importDefault(require("../../view/reviewViewer"));
function parseQuery(query) {
    const { limit, offset } = query;
    const limitNumber = limit ? parseInt(limit) : undefined;
    const offsetNumber = offset ? parseInt(offset) : undefined;
    return { limit: limitNumber, offset: offsetNumber };
}
/**
 * Review controller that must receive a request with an authenticated user.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function reviewsFeed(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, offset } = parseQuery(req.query);
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(401);
            // Get reviews feed
            const reviews = yield (0, reviewFeedPrisma_1.default)(currentUser, limit, offset);
            // Create reviews feed view
            const reviewsFeedView = reviews.map((review) => currentUser ? (0, reviewViewer_1.default)(review, currentUser) : (0, reviewViewer_1.default)(review));
            return res.json({
                reviews: reviewsFeedView,
                reviewsCount: reviewsFeedView.length,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = reviewsFeed;

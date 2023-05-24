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
const reviewListPrisma_1 = __importDefault(require("../../utils/db/review/reviewListPrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const reviewViewer_1 = __importDefault(require("../../view/reviewViewer"));
function parseReviewListQuery(query) {
    let { tag, author, favorited } = query;
    const { limit, offset } = query;
    tag = tag ? tag : undefined;
    author = author ? author : undefined;
    favorited = favorited ? favorited : undefined;
    const limitNumber = limit ? parseInt(limit) : undefined;
    const offsetNumber = offset ? parseInt(offset) : undefined;
    return { tag, author, favorited, limit: limitNumber, offset: offsetNumber };
}
/**
 * Review controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function reviewsList(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { tag, author, favorited, limit, offset } = parseReviewListQuery(req.query);
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(username);
            // Get the reviews
            const reviews = yield (0, reviewListPrisma_1.default)(tag, author, favorited, limit, offset);
            // Create reviews view
            const reviewsListView = reviews.map((review) => currentUser ? (0, reviewViewer_1.default)(review, currentUser) : (0, reviewViewer_1.default)(review));
            return res.json({
                reviews: reviewsListView,
                reviewsCount: reviewsListView.length,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = reviewsList;

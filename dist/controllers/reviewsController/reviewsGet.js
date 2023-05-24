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
const reviewGetPrisma_1 = __importDefault(require("../../utils/db/review/reviewGetPrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const reviewViewer_1 = __importDefault(require("../../view/reviewViewer"));
/**
 * Review controller that must receive a request.
 * The parameters of the request must have a slug.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function reviewsGet(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(username);
            // Get the review
            const review = yield (0, reviewGetPrisma_1.default)(slug);
            if (!review)
                return res.sendStatus(404);
            // Create the review view
            const reviewView = currentUser
                ? (0, reviewViewer_1.default)(review, currentUser)
                : (0, reviewViewer_1.default)(review);
            return res.status(200).json({ review: reviewView });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = reviewsGet;

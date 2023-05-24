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
const prisma_1 = __importDefault(require("../prisma"));
function reviewFeedPrisma(currentUser, limit = 20, offset = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield prisma_1.default.review.findMany({
            include: {
                tagList: true,
                author: {
                    include: { followedBy: { where: { username: currentUser.username } } },
                },
                _count: { select: { likedBy: true } },
            },
            take: limit,
            skip: offset,
        });
        return reviews;
    });
}
exports.default = reviewFeedPrisma;

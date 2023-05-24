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
const slugfy_1 = __importDefault(require("../../slugfy"));
const prisma_1 = __importDefault(require("../prisma"));
function reviewUpdatePrisma(slug, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const newSlug = (0, slugfy_1.default)(slug);
        const review = yield prisma_1.default.review.update({
            where: { slug },
            data: Object.assign(Object.assign({}, info), { slug: newSlug, updatedAt: new Date() }),
            include: {
                author: { include: { followedBy: true } },
                tagList: true,
                _count: { select: { likedBy: true } },
            },
        });
        return review;
    });
}
exports.default = reviewUpdatePrisma;

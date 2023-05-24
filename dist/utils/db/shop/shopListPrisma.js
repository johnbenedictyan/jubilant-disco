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
function shopsListPrisma(name, addressField1, addressField2, addressField3, postalCode, tag, favorited, limit = 20, offset = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const shops = yield prisma_1.default.shop.findMany({
            where: {
                name,
                addressField1,
                addressField2,
                addressField3,
                postalCode,
                tagList: tag ? { some: { tagName: tag } } : undefined,
                favoritedBy: favorited ? { some: { username: favorited } } : undefined,
            },
            take: limit,
            skip: offset,
            orderBy: { rating: "desc" },
            include: {
                queueList: true,
                tagList: true,
                _count: { select: { favoritedBy: true } },
            },
        });
        return shops;
    });
}
exports.default = shopsListPrisma;

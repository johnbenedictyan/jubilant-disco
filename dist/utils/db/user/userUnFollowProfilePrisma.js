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
function userUnFollowProfilePrisma(currentUser, unFollowUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        const follows = yield prisma_1.default.user.update({
            where: { username: unFollowUsername },
            data: { followedBy: { disconnect: { username: currentUser.username } } },
            include: { followedBy: { where: { username: currentUser.username } } },
        });
        return follows;
    });
}
exports.default = userUnFollowProfilePrisma;

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
const shopFavoritePrisma_1 = __importDefault(require("../../utils/db/shop/shopFavoritePrisma"));
const shopGetPrisma_1 = __importDefault(require("../../utils/db/shop/shopGetPrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const shopViewer_1 = __importDefault(require("../../view/shopViewer"));
/**
 * Shop controller that must receive a request with an authenticated user.
 * The parameters of the request must have an id.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function shopsFavorite(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const username = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user.username;
        try {
            // Get current user
            let currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(401);
            // Get the shop
            const shop = yield (0, shopGetPrisma_1.default)(id);
            if (!shop)
                return res.sendStatus(404);
            // Favorite the shop
            yield (0, shopFavoritePrisma_1.default)(currentUser, id);
            // Retrieve current user after update of its favorited shops
            currentUser = yield (0, userGetPrisma_1.default)(username);
            if (!currentUser)
                return res.sendStatus(500); // The user should not have disappeared after having favorited an shop
            // Create shop view
            const shopView = (0, shopViewer_1.default)(shop, currentUser);
            return res.json({ shop: shopView });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = shopsFavorite;

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
const shopListPrisma_1 = __importDefault(require("../../utils/db/shop/shopListPrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const shopViewer_1 = __importDefault(require("../../view/shopViewer"));
function parseShopListQuery(query) {
    let { name, addressField1, addressField2, addressField3, postalCode, tag, author, favorited, } = query;
    const { limit, offset } = query;
    name = name ? name : undefined;
    addressField1 = addressField1 ? addressField1 : undefined;
    addressField2 = addressField2 ? addressField2 : undefined;
    addressField3 = addressField3 ? addressField3 : undefined;
    favorited = favorited ? favorited : undefined;
    tag = tag ? tag : undefined;
    const postalCodeNumber = postalCode
        ? parseInt(postalCode)
        : undefined;
    const limitNumber = limit ? parseInt(limit) : undefined;
    const offsetNumber = offset ? parseInt(offset) : undefined;
    return {
        name,
        addressField1,
        addressField2,
        addressField3,
        postalCodeNumber,
        tag,
        author,
        favorited,
        limit: limitNumber,
        offset: offsetNumber,
    };
}
/**
 * Shop controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function shopsList(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { name, addressField1, addressField2, addressField3, postalCodeNumber, tag, favorited, limit, offset, } = parseShopListQuery(req.query);
        const username = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(username);
            // Get the shops
            const shops = yield (0, shopListPrisma_1.default)(name, addressField1, addressField2, addressField3, postalCodeNumber, tag, favorited, limit, offset);
            // Create shops view
            const shopsListView = shops.map((shop) => currentUser ? (0, shopViewer_1.default)(shop, currentUser) : (0, shopViewer_1.default)(shop));
            return res.json({
                shops: shopsListView,
                shopsCount: shopsListView.length,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = shopsList;

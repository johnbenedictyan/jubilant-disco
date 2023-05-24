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
const shopCreatePrisma_1 = __importDefault(require("../../utils/db/shop/shopCreatePrisma"));
const tagsCreatePrisma_1 = __importDefault(require("../../utils/db/tag/tagsCreatePrisma"));
const userGetPrisma_1 = __importDefault(require("../../utils/db/user/userGetPrisma"));
const shopViewer_1 = __importDefault(require("../../view/shopViewer"));
/**
 * Shop controller that must receive a request with an authenticated user.
 * The body of the request must have the shop object that is an @interface Shop.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function shopsCreate(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { name, addressField1, addressField2, addressField3, postalCode, tagList, } = req.body.shop;
        const userName = (_b = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
        try {
            // Get current user
            const currentUser = yield (0, userGetPrisma_1.default)(userName);
            if (!currentUser)
                return res.sendStatus(401);
            // Create list of tags
            let tags = [];
            if (tagList && tagList.length > 0) {
                tags = yield (0, tagsCreatePrisma_1.default)(tagList);
            }
            // Create the shop
            const shop = yield (0, shopCreatePrisma_1.default)({
                name,
                addressField1,
                addressField2,
                addressField3,
                postalCode,
            }, tags);
            // Create shop view
            const shopView = (0, shopViewer_1.default)(shop, currentUser);
            return res.status(201).json({ shop: shopView });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = shopsCreate;

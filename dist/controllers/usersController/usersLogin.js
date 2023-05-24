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
const createUserToken_1 = __importDefault(require("../../utils/auth/createUserToken"));
const userGetEmailPrisma_1 = __importDefault(require("../../utils/db/user/userGetEmailPrisma"));
const hashPasswords_1 = require("../../utils/hashPasswords");
const userViewer_1 = __importDefault(require("../../view/userViewer"));
/**
 * Users controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request with a body property body containing a json with user object with name and email as properties.
 * @param res Response
 */
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body.user;
        try {
            // Get the user with given email
            const user = yield (0, userGetEmailPrisma_1.default)(email);
            if (!user)
                return res.sendStatus(404);
            // Compare the user password given with the one stored
            console.log(password, user.password);
            if (!(0, hashPasswords_1.compareWithHash)(password, user.password))
                return res.sendStatus(403);
            // Create the user token for future authentication
            const token = (0, createUserToken_1.default)(user);
            // Create the user view containing the authentication token
            const userView = (0, userViewer_1.default)(user, token);
            return res.json(userView);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = userLogin;

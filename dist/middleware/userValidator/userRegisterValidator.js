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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function is a middleware that validates the user information in the request in order to log the user.
 * If the request is malformed it responds accordingly and returns, stopping the flow of the express.
 * If the request is well formed, it passes control to the next handler.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function userRegisterValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = {};
        errors.body = [];
        if (!req.body) {
            errors.body.push("can't be empty");
            return res.status(400).json({ errors });
        }
        const { user } = req.body;
        if (!user) {
            errors.body.push("user object must be defined");
            return res.status(400).json({ errors });
        }
        const { password, email, username } = user;
        if (!password) {
            errors.body.push("password property in user can't be empty");
        }
        else if (typeof password != "string") {
            errors.body.push("password property in user must be a string");
        }
        if (!email) {
            errors.body.push("email property in user can't be empty");
        }
        else if (typeof email != "string") {
            errors.body.push("email property in user must be a string");
        }
        if (!username) {
            errors.body.push("username property in user can't be empty");
        }
        else if (typeof username != "string") {
            errors.body.push("username property in user must be a string");
        }
        if (errors.body.length)
            return res.status(400).json({ errors });
        next();
    });
}
exports.default = userRegisterValidator;

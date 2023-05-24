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
function userUpdateValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = {};
        errors.body = [];
        if (!req.body) {
            errors.body.push("can't be empty");
            return res.status(400).json({ errors });
        }
        const { user } = req.body;
        if (!user) {
            errors.body.push("user property must exist");
            return res.status(400).json({ errors });
        }
        if (typeof user != "object") {
            errors.body.push("user must be an object");
            return res.status(400).json({ errors });
        }
        const optional_fields = ["email", "username", "password", "image", "bio"];
        for (const key of Object.keys(user)) {
            if (typeof key != "string" && key in optional_fields) {
                errors.body.push(`${key} must be of type string`);
            }
            if (!optional_fields.includes(key)) {
                errors.body.push(`${key} is not one of the fields accepted`);
            }
        }
        if (errors.body.length)
            return res.status(400).json({ errors });
        next();
    });
}
exports.default = userUpdateValidator;

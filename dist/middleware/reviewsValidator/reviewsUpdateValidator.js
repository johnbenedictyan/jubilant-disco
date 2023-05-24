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
 * Middleware to validate request properties for reviews update controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function reviewsUpdateValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = {};
        errors.body = [];
        if (!req.body) {
            errors.body.push("can't be empty");
            return res.status(400).json({ errors });
        }
        if (!req.body.review && typeof req.body.review != "object") {
            errors.body.push("review must be an object inside body");
            return res.status(400).json({ errors });
        }
        const { title, description, body } = req.body.review;
        if (title && typeof title != "string")
            errors.body.push("title must be a string");
        if (description && typeof description != "string")
            errors.body.push("description must be a string");
        if (body && typeof body != "string")
            errors.body.push("body must be a string");
        if (errors.body.length)
            return res.status(400).json({ errors });
        next();
    });
}
exports.default = reviewsUpdateValidator;

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
 * Middleware to validate input for shop creation controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function shopsCreateValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = {};
        errors.body = [];
        if (!req.body) {
            errors.body.push("can't be empty");
            return res.status(400).json({ errors });
        }
        if (!req.body.shop && typeof req.body.shop != "object") {
            errors.body.push("shop must be an object inside body");
            return res.status(400).json({ errors });
        }
        const { name, addressField1, addressField2, addressField3, postalCode, tagList, } = req.body.shop;
        // Checks if title description and body are present and non-empty strings.
        const requiredStringChecks = {
            name,
            addressField1,
            addressField2,
            addressField3,
        };
        for (const [variable, content] of Object.entries(requiredStringChecks)) {
            if (typeof content != "string" || content.length == 0) {
                errors.body.push(`${variable} field must be a non-empty string`);
            }
        }
        const requiredNumberChecks = {
            postalCode,
        };
        for (const [variable, content] of Object.entries(requiredNumberChecks)) {
            if (typeof content != "number") {
                errors.body.push(`${variable} field must be a valid number`);
            }
        }
        // Checks if tagList is an array of strings in case it is not undefined.
        if (tagList && !Array.isArray(tagList))
            errors.body.push("tagList must be an array of non-empty strings");
        else if (tagList) {
            let foundError = false;
            for (const tag of tagList) {
                if (typeof tag != "string" || tag.length == 0) {
                    foundError = true;
                }
            }
            if (foundError)
                errors.body.push("tagList must be an array of non-empty strings");
        }
        if (errors.body.length)
            return res.status(400).json({ errors });
        next();
    });
}
exports.default = shopsCreateValidator;

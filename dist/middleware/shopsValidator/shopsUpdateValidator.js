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
 * Middleware to validate request properties for shops update controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function shopsUpdateValidator(req, res, next) {
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
        const { name, addressField1, addressField2, addressField3, postalCode } = req.body.shop;
        if (name && typeof name != "string")
            errors.body.push("Shop name must be a string");
        if (addressField1 && typeof addressField1 != "string")
            errors.body.push("Address Field 1 must be a string");
        if (addressField2 && typeof addressField2 != "string")
            errors.body.push("Address Field 2 must be a string");
        if (addressField3 && typeof addressField3 != "string")
            errors.body.push("Address Field 3 must be a string");
        if (postalCode && typeof postalCode != "number")
            errors.body.push("Postal Code must be a valid number");
        if (errors.body.length)
            return res.status(400).json({ errors });
        next();
    });
}
exports.default = shopsUpdateValidator;

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
const express_jwt_1 = require("express-jwt");
const logger_1 = __importDefault(require("../../utils/logger"));
/**
 * Middleware that handles authentication errors.
 * @param err Error
 * @param _req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
function authErrorHandler(err, _req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(err instanceof express_jwt_1.UnauthorizedError))
            return next(err);
        // Se why authorization failed
        logger_1.default.debug(`Authorization failed due to ${err.code}`);
        switch (err.code) {
            case "credentials_required":
                return res.sendStatus(401);
            case "credentials_bad_scheme":
                return res.status(400).json({
                    errors: { header: ["authorization token with bad scheme"] },
                });
            case "invalid_token":
                return res
                    .status(401)
                    .json({ errors: { header: ["authorization token is invalid"] } });
            default:
                logger_1.default.error(`Unhandled UnauthorizedError with code ${err.code}`);
                return res.sendStatus(500);
        }
    });
}
exports.default = authErrorHandler;

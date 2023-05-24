"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
/**
 * Middleware that handles general errors not handled by other middleware.
 * The last line of defense against errors.
 * @param err Error
 * @param _req Request
 * @param res Response
 * @param _next NextFunction
 * @returns
 */
function generalErrorHandler(err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) {
    // This is an unknown type of error.
    logger_1.default.error(`Unhandled error in generalErrorHandler`);
    logger_1.default.error(`${err.message}\n${err.name}\n${err.stack}`);
    return res.sendStatus(500);
}
exports.default = generalErrorHandler;

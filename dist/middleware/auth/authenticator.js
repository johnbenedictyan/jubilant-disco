"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthenticate = exports.optionalAuthenticate = exports.authenticate = void 0;
const dotenv = __importStar(require("dotenv"));
const express_jwt_1 = require("express-jwt");
dotenv.config();
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in environment.");
}
/**
 * Function that receives a request with possibly an authorization token in the headers and returns this token.
 * @param req Request
 * @returns the token or undefined
 */
function getTokenInHeader(req) {
    const authorization = req.headers.authorization;
    if (!authorization)
        return;
    if (authorization.split(" ").length != 2)
        return;
    const [tag, token] = authorization.split(" ");
    if (tag === "Token" || tag === "Bearer")
        return token;
    return;
}
// Authenticate is a middleware that will not throw errors, only if user is able to authenticate.
exports.authenticate = (0, express_jwt_1.expressjwt)({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    getToken: getTokenInHeader,
});
// OptionalAuthenticate is a middleware that will not throw errors, the authentication is optional.
exports.optionalAuthenticate = (0, express_jwt_1.expressjwt)({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: getTokenInHeader,
});
// Admin Authenticate is a middleware that will not throw errors, only if user is an admin.
exports.adminAuthenticate = [
    exports.authenticate,
    (req, res, next) => {
        var _a, _b;
        if (((_a = req.auth) === null || _a === void 0 ? void 0 : _a.user.role) && ((_b = req.auth) === null || _b === void 0 ? void 0 : _b.user.role) != "admin") {
            return res.sendStatus(401);
        }
        next();
    },
];

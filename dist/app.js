"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandling_1 = require("./middleware/errorHandling");
const generalErrorHandler_1 = __importDefault(require("./middleware/errorHandling/generalErrorHandler"));
const profiles_1 = __importDefault(require("./routes/api/profiles"));
const reviews_1 = __importDefault(require("./routes/api/reviews"));
const shops_1 = __importDefault(require("./routes/api/shops"));
const tags_1 = __importDefault(require("./routes/api/tags"));
const user_1 = __importDefault(require("./routes/api/user"));
const users_1 = __importDefault(require("./routes/api/users"));
const app = (0, express_1.default)();
// Allows parsing of json in the body of the request.
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/user", user_1.default);
app.use("/api/profiles", profiles_1.default);
app.use("/api/reviews", reviews_1.default);
app.use("/api/shops", shops_1.default);
app.use("/api/tags", tags_1.default);
app.get("/", function (_req, res) {
    return res.send("This is just the backend for RealWorld");
});
app.use(errorHandling_1.authErrorHandler, errorHandling_1.prismaErrorHandler, generalErrorHandler_1.default);
exports.default = app;

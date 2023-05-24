"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app_1.default.listen(port, function () {
    console.log(`Express Server initiated listening on port ${port}`);
});
process.on("SIGTERM", function () {
    console.log(`SIGTERM signal received: closing HTTP server.`);
    process.exit();
});
process.on("SIGINT", function () {
    console.log(`SIGINT signal received: closing HTTP server.`);
    process.exit();
});

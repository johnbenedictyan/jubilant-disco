"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_mock_extended_1 = require("jest-mock-extended");
const prisma_1 = __importDefault(require("../db/prisma"));
jest.mock("../db/prisma", () => ({
    __esModule: true,
    default: (0, jest_mock_extended_1.mockDeep)(),
}));
beforeEach(() => {
    (0, jest_mock_extended_1.mockReset)(prismaMock);
});
const prismaMock = prisma_1.default;
exports.default = prismaMock;

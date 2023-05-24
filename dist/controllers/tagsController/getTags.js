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
const prisma_1 = __importDefault(require("../../utils/db/prisma"));
const tagViewer_1 = __importDefault(require("../../view/tagViewer"));
/**
 * Tags controller that responds with a list of all the tags on the system.
 * @param _req
 * @param res
 * @returns
 */
function getTags(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get all the tags
        const tags = yield prisma_1.default.tag.findMany();
        // Create the tags view
        const tagsView = tags.map((tag) => (0, tagViewer_1.default)(tag));
        return res.json({ tags: tagsView });
    });
}
exports.default = getTags;

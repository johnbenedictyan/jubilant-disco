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
const express_1 = require("express");
const shops = __importStar(require("../../controllers/shopController"));
const auth = __importStar(require("../../middleware/auth/authenticator"));
const validator = __importStar(require("../../middleware/shopsValidator"));
const router = (0, express_1.Router)();
router.get("/", auth.optionalAuthenticate, validator.shopsListValidator, shops.shopsList);
router.get("/:id", auth.optionalAuthenticate, shops.shopsGet);
router.post("/", auth.authenticate, validator.shopsCreateValidator, shops.shopsCreate);
router.put("/:id", auth.authenticate, validator.shopsUpdateValidator, shops.shopsUpdate);
router.delete("/:id", auth.authenticate, shops.shopsDelete);
router.post("/:id/favorite", auth.authenticate, shops.shopsFavorite);
router.delete("/:id/favorite", auth.authenticate, shops.shopsUnFavorite);
exports.default = router;

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
const reviews = __importStar(require("../../controllers/reviewsController"));
const validator = __importStar(require("../../middleware/reviewsValidator"));
const auth = __importStar(require("../../middleware/auth/authenticator"));
const router = (0, express_1.Router)();
router.get("/", auth.optionalAuthenticate, validator.reviewsListValidator, reviews.reviewsList);
router.get("/feed", auth.authenticate, validator.reviewsFeedValidator, reviews.reviewsFeed);
router.get("/:slug", auth.optionalAuthenticate, reviews.reviewsGet);
router.post("/", auth.authenticate, validator.reviewsCreateValidator, reviews.reviewsCreate);
router.put("/:slug", auth.authenticate, validator.reviewsUpdateValidator, reviews.reviewsUpdate);
router.delete("/:slug", auth.authenticate, reviews.reviewsDelete);
router.post("/:slug/like", auth.authenticate, reviews.reviewsLike);
router.delete("/:slug/like", auth.authenticate, reviews.reviewsUnLike);
exports.default = router;

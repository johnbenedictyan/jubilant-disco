"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileViewer_1 = __importDefault(require("./profileViewer"));
function reviewViewer(review, currentUser) {
    const liked = currentUser
        ? currentUser.likes.some((value) => value.slug === review.slug)
        : false;
    const tagListView = review.tagList.map((tag) => tag.tagName).sort();
    const authorView = (0, profileViewer_1.default)(review.author, currentUser);
    const reviewView = {
        slug: review.slug,
        title: review.title,
        description: review.description,
        body: review.body,
        tagList: tagListView,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        liked: liked,
        likesCount: review._count.likedBy,
        author: authorView,
    };
    return reviewView;
}
exports.default = reviewViewer;

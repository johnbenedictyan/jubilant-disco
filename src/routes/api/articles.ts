import { Router } from "express";
import * as reviews from "../../controllers/reviewsController";
import * as comments from "../../controllers/commentsController";
import * as validator from "../../middleware/reviewsValidator";
import commentCreateValidator from "../../middleware/commentsValidator/commentCreateValidator";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get(
  "/",
  auth.optionalAuthenticate,
  validator.reviewsListValidator,
  reviews.reviewsList
);

router.get(
  "/feed",
  auth.authenticate,
  validator.reviewsFeedValidator,
  reviews.reviewsFeed
);

router.get("/:slug", auth.optionalAuthenticate, reviews.reviewsGet);

router.post(
  "/",
  auth.authenticate,
  validator.reviewsCreateValidator,
  reviews.reviewsCreate
);

router.put(
  "/:slug",
  auth.authenticate,
  validator.reviewsUpdateValidator,
  reviews.reviewsUpdate
);

router.delete("/:slug", auth.authenticate, reviews.reviewsDelete);

router.post(
  "/:slug/comments",
  auth.authenticate,
  commentCreateValidator,
  comments.createComment
);

router.get("/:slug/comments", auth.optionalAuthenticate, comments.getComments);

router.delete(
  "/:slug/comments/:id([0-9]+)",
  auth.authenticate,
  comments.deleteComment
);

router.post("/:slug/favorite", auth.authenticate, reviews.reviewsFavorite);

router.delete(
  "/:slug/favorite",
  auth.authenticate,
  reviews.reviewsUnFavorite
);

export default router;

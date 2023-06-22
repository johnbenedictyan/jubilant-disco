import { Router } from "express";
import * as reviews from "../../controllers/reviewsController";
import * as auth from "../../middleware/auth/authenticator";
import * as validator from "../../middleware/reviewsValidator";

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

router.post("/:slug/like", auth.authenticate, reviews.reviewsLike);

router.delete(
  "/:slug/like",
  auth.authenticate,
  reviews.reviewsUnLike
);

export default router;

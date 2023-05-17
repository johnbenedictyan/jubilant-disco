import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import reviewUnLikePrisma from "../../utils/db/review/reviewUnLikePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import reviewViewer from "../../view/reviewViewer";

/**
 * Review controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsUnLike(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user?.username;

  try {
    // Get current user
    let currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // UnLike the review
    const review = await reviewUnLikePrisma(currentUser, slug);
    if (!review) return res.sendStatus(404);

    // Retrieve current user after update of its liked reviews
    currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(500); // The user should not have disappeared after having un-liked an review

    // Create review view
    const reviewView = reviewViewer(review, currentUser);
    return res.json({ review: reviewView });
  } catch (error) {
    next(error);
  }
}

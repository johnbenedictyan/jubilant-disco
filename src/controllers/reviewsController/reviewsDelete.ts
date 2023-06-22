import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import reviewDeletePrisma from "../../utils/db/review/reviewDeletePrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import reviewViewer from "../../view/reviewViewer";

/**
 * Review controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Delete the review
    const review = await reviewDeletePrisma(slug);

    // Create the deleted review view
    const reviewView = reviewViewer(review, currentUser);
    return res.status(200).json({ review: reviewView });
  } catch (error) {
    return next(error);
  }
}

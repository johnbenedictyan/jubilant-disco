import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import reviewGetPrisma from "../../utils/db/review/reviewGetPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import reviewViewer from "../../view/reviewViewer";

/**
 * Review controller that must receive a request.
 * The parameters of the request must have a slug.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the review
    const review = await reviewGetPrisma(slug);
    if (!review) return res.sendStatus(404);

    // Create the review view
    const reviewView = currentUser
      ? reviewViewer(review, currentUser)
      : reviewViewer(review);
    return res.status(200).json({ review: reviewView });
  } catch (error) {
    return next(error);
  }
}

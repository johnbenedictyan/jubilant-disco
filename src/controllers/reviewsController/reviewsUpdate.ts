import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import reviewUpdatePrisma from "../../utils/db/review/reviewUpdatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import reviewViewer from "../../view/reviewViewer";

/**
 * Review controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * The body of the request must have an review object with title, description and body.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const { title, description, body } = req.body.review;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Update the review
    const review = await reviewUpdatePrisma(slug, {
      title,
      description,
      body,
    });

    // Create the review view
    const reviewView = reviewViewer(review, currentUser);
    return res.status(200).json({ review: reviewView });
  } catch (error) {
    return next(error);
  }
}

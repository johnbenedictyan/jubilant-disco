import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import reviewFeedPrisma from "../../utils/db/review/reviewFeedPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import reviewViewer from "../../view/reviewViewer";

function parseQuery(query: ParsedQs) {
  const { limit, offset } = query;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return { limit: limitNumber, offset: offsetNumber };
}

/**
 * Review controller that must receive a request with an authenticated user.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsFeed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { limit, offset } = parseQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Get reviews feed
    const reviews = await reviewFeedPrisma(currentUser, limit, offset);

    // Create reviews feed view
    const reviewsFeedView = reviews.map((review) =>
      currentUser ? reviewViewer(review, currentUser) : reviewViewer(review)
    );

    return res.json({
      reviews: reviewsFeedView,
      reviewsCount: reviewsFeedView.length,
    });
  } catch (error) {
    return next(error);
  }
}

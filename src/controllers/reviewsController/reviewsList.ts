import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import reviewsListPrisma from "../../utils/db/review/reviewListPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import reviewViewer from "../../view/reviewViewer";

function parseReviewListQuery(query: ParsedQs) {
  let { tag, author, favorited } = query;
  const { limit, offset } = query;
  tag = tag ? (tag as string) : undefined;
  author = author ? (author as string) : undefined;
  favorited = favorited ? (favorited as string) : undefined;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return { tag, author, favorited, limit: limitNumber, offset: offsetNumber };
}

/**
 * Review controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tag, author, favorited, limit, offset } = parseReviewListQuery(
    req.query
  );
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the reviews
    const reviews = await reviewsListPrisma(
      tag,
      author,
      favorited,
      limit,
      offset
    );

    // Create reviews view
    const reviewsListView = reviews.map((review) =>
      currentUser ? reviewViewer(review, currentUser) : reviewViewer(review)
    );

    return res.json({
      reviews: reviewsListView,
      reviewsCount: reviewsListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

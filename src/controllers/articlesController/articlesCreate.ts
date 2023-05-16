import { Tag } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import reviewCreatePrisma from "../../utils/db/review/reviewCreatePrisma";
import tagsCreatePrisma from "../../utils/db/tag/tagsCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import reviewViewer from "../../view/reviewViewer";

interface Review {
  title: string;
  description: string;
  body: string;
  tagList?: Array<string>;
}

/**
 * Review controller that must receive a request with an authenticated user.
 * The body of the request must have the review object that is an @interface Review.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function reviewsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, body, tagList }: Review = req.body.review;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create list of tags
    let tags: Tag[] = [];
    if (tagList && tagList.length > 0) {
      tags = await tagsCreatePrisma(tagList);
    }

    // Create the review
    const review = await reviewCreatePrisma(
      { title, description, body },
      tags,
      currentUser.username
    );

    // Create review view
    const reviewView = reviewViewer(review, currentUser);
    return res.status(201).json({ review: reviewView });
  } catch (error) {
    return next(error);
  }
}

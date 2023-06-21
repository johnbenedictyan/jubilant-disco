import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import anyQueueItemCreatePrisma from "../../utils/db/anyQueueItem/anyQueueItemCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import anyQueueItemViewer from "../../view/anyQueueItemViewer";

interface anyQueueItem {
  userUsername: string;
  shopId: number;
}

/**
 * anyQueueItem controller that must receive a request with an authenticated user.
 * The body of the request must have the anyQueueItem object that is an @interface anyQueueItem.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function anyQueueItemsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userUsername, shopId }: anyQueueItem =
    req.body.anyQueueItem;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create the anyQueueItem
    const anyQueueItem = await anyQueueItemCreatePrisma({
      userUsername,
      shopId,
    });

    // Create anyQueueItem view
    const anyQueueItemView = anyQueueItemViewer(anyQueueItem, currentUser);
    return res.status(201).json({ anyQueueItem: anyQueueItemView });
  } catch (error) {
    return next(error);
  }
}

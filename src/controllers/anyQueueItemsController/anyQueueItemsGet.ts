import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import anyQueueItemGetPrisma from "../../utils/db/anyQueueItem/anyQueueItemGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import anyQueueItemViewer from "../../view/anyQueueItemViewer";

/**
 * anyQueueItem controller that must receive a request.
 * The parameters of the request must have a anyQueueItemHash.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function anyQueueItemsGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userUsername = req.params.userUsername;
  const shopId = req.params.shopId;
  const shopIdNumber = parseInt(shopId as string);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the anyQueueItem
    const anyQueueItem = await anyQueueItemGetPrisma({
      userUsername,
      shopId: shopIdNumber,
    });
    if (!anyQueueItem) return res.sendStatus(404);

    // Create the anyQueueItem view
    const anyQueueItemView = currentUser
      ? anyQueueItemViewer(anyQueueItem, currentUser)
      : anyQueueItemViewer(anyQueueItem);
    return res.status(200).json({ anyQueueItem: anyQueueItemView });
  } catch (error) {
    return next(error);
  }
}

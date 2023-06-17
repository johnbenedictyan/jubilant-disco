import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemDeletePrisma from "../../utils/db/queueItem/queueItemDeletePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

/**
 * queueItem controller that must receive a request with an authenticated user.
 * The parameters of the request must have a queueItemHash.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userUsername = req.params.userUsername;
  const shopId = req.params.shopId!;
  const shopIdNumber = parseInt(shopId as string);

  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Delete the queueItem
    const queueItem = await queueItemDeletePrisma({
      userUsername,
      shopId: shopIdNumber,
    });

    // Create the deleted queueItem view
    const queueItemView = queueItemViewer(queueItem, currentUser);
    return res.status(200).json({ queueItem: queueItemView });
  } catch (error) {
    return next(error);
  }
}

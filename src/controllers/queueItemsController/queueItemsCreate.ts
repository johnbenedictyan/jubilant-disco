import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemCreatePrisma from "../../utils/db/queueItem/queueItemCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

interface queueItem {
  userUsername: string;
  number: number;
  shopId: number;
  queueHash?: string;
}

/**
 * queueItem controller that must receive a request with an authenticated user.
 * The body of the request must have the queueItem object that is an @interface queueItem.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userUsername, number, shopId, queueHash }: queueItem =
    req.body.queueItem;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create the queueItem
    const queueItem = await queueItemCreatePrisma({
      userUsername,
      number,
      shopId,
      queueHash,
    });

    // Create queueItem view
    const queueItemView = queueItemViewer(queueItem, currentUser);
    return res.status(201).json({ queueItem: queueItemView });
  } catch (error) {
    return next(error);
  }
}
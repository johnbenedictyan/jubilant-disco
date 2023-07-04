import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemGetPositionPrisma from "../../utils/db/queueItem/queueItemGetPositionPrisma";
import queueItemUpdatePrisma from "../../utils/db/queueItem/queueItemUpdatePrisma";
import queueItemViewer from "../../view/queueItemViewer";

/**
 * queueItem controller that must receive a request with an authenticated user.
 * The parameters of the request must have a queueItemHash.
 * The body of the request must have an queueItem object with title, description and body.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id as string);

  const { valid, name, phoneNumber, current } = req.body.queueItem;
  //   const userName = req.auth?.user?.username;

  try {
    // Get current user
    // const currentUser = await userGetPrisma(userName);
    // if (!currentUser) return res.sendStatus(401);

    // Update the queueItem
    const queueItem = await queueItemUpdatePrisma(id, {
      valid,
      name,
      phoneNumber,
      current,
    });

    // Get Item Position
    const position = await queueItemGetPositionPrisma(queueItem);

    // Create the queueItem view
    const queueItemView = queueItemViewer(queueItem, position);
    return res.status(200).json({ queueItem: queueItemView });
  } catch (error) {
    return next(error);
  }
}

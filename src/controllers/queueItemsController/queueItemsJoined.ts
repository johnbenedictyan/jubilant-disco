import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemsJoinedListPrisma from "../../utils/db/queueItem/queueItemJoinedListPrisma";
import queueItemViewer from "../../view/queueItemViewer";

/**
 * queueItem controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsJoined(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { queueId, uuid } = req.params;
  //   const username = req.auth?.user?.username;

  try {
    // Get current user
    // const currentUser = await userGetPrisma(username);

    if (!(uuid && queueId)) {
      return res.sendStatus(404);
    }

    const queueIdNumber = Number(queueId);

    // Get the queueItems
    const queueItems = await queueItemsJoinedListPrisma(queueIdNumber, uuid);

    if (queueItems.length == 0) return res.sendStatus(404);

    // Create the queueItem view
    const queueItemView = queueItemViewer(queueItems[0]);

    return res.json({
      queueItem: queueItemView,
    });
  } catch (error) {
    return next(error);
  }
}

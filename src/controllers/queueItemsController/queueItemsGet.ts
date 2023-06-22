import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemGetPrisma from "../../utils/db/queueItem/queueItemGetPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

/**
 * queueItem controller that must receive a request.
 * The parameters of the request must have a queueItemHash.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id as string);

  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the queueItem
    const queueItem = await queueItemGetPrisma({
      id,
    });
    if (!queueItem) return res.sendStatus(404);

    // Create the queueItem view
    const queueItemView = currentUser
      ? queueItemViewer(queueItem, currentUser)
      : queueItemViewer(queueItem);
    return res.status(200).json({ queueItem: queueItemView });
  } catch (error) {
    return next(error);
  }
}

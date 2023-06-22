import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import anyQueueItemDeletePrisma from "../../utils/db/anyQueueItem/anyQueueItemDeletePrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import anyQueueItemViewer from "../../view/anyQueueItemViewer";

/**
 * anyQueueItem controller that must receive a request with an authenticated user.
 * The parameters of the request must have a anyQueueItemHash.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function anyQueueItemsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id as string);

  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Delete the anyQueueItem
    const anyQueueItem = await anyQueueItemDeletePrisma({
      id,
    });

    // Create the deleted anyQueueItem view
    const anyQueueItemView = anyQueueItemViewer(anyQueueItem, currentUser);
    return res.status(200).json({ anyQueueItem: anyQueueItemView });
  } catch (error) {
    return next(error);
  }
}

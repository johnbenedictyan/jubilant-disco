import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import queueItemsListPrisma from "../../utils/db/queueItem/queueItemListPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

function parseQueueItemListQuery(query: ParsedQs) {
  let { queueHash, userUsername } = query;
  queueHash = queueHash ? (queueHash as string) : undefined;
  userUsername = userUsername ? (userUsername as string) : undefined;

  return {
    queueHash,
    userUsername,
  };
}

/**
 * queueItem controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { queueHash, userUsername } = parseQueueItemListQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the queueItems
    const queueItems = await queueItemsListPrisma(queueHash, userUsername);

    if (queueItems.length == 0) return res.sendStatus(404);

    // Create the queueItem view
    const queueItemView = queueItemViewer(queueItems[0]);

    return res.json({
      queueItemJoined: queueItemView,
    });
  } catch (error) {
    return next(error);
  }
}

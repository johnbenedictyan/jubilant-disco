import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import queueItemsListPrisma from "../../utils/db/queueItem/queueItemListPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

function parseQueueItemListQuery(query: ParsedQs) {
  let { queueId, userUsername, valid } = query;
  const queueIdNumber = queueId ? parseInt(queueId as string) : undefined;
  userUsername = userUsername ? (userUsername as string) : undefined;
  const validBool = valid ? Boolean(valid) : undefined;

  return {
    queueId: queueIdNumber,
    userUsername,
    validBool,
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
  const { queueId, userUsername, validBool } = parseQueueItemListQuery(
    req.query
  );
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the queueItems
    const queueItems = await queueItemsListPrisma(
      queueId,
      userUsername,
      validBool
    );

    // Create queueItems view
    const queueItemsListView = queueItems.map((queueItem) =>
      currentUser
        ? queueItemViewer(queueItem, currentUser)
        : queueItemViewer(queueItem)
    );

    return res.json({
      queueItems: queueItemsListView,
      queueItemsCount: queueItemsListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

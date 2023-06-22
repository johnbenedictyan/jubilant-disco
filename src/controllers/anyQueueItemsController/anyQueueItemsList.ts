import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import anyQueueItemsListPrisma from "../../utils/db/anyQueueItem/anyQueueItemListPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import anyQueueItemViewer from "../../view/anyQueueItemViewer";

function parseAnyQueueItemListQuery(query: ParsedQs) {
  let { shopId, userUsername, valid } = query;
  userUsername = userUsername ? (userUsername as string) : undefined;
  valid = valid ? (valid as string) : undefined;
  const shopIdNumber = shopId ? parseInt(shopId as string) : undefined;
  const validBool = valid ? Boolean(valid) : undefined;

  return {
    shopIdNumber,
    userUsername,
    validBool,
  };
}

/**
 * anyQueueItem controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function anyQueueItemsList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { shopIdNumber, userUsername, validBool } = parseAnyQueueItemListQuery(
    req.query
  );
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the anyQueueItems
    const anyQueueItems = await anyQueueItemsListPrisma(
      shopIdNumber,
      userUsername,
      validBool
    );

    // Create anyQueueItems view
    const anyQueueItemsListView = anyQueueItems.map((anyQueueItem) =>
      currentUser
        ? anyQueueItemViewer(anyQueueItem, currentUser)
        : anyQueueItemViewer(anyQueueItem)
    );

    return res.json({
      anyQueueItems: anyQueueItemsListView,
      anyQueueItemsCount: anyQueueItemsListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

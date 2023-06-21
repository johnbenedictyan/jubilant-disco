import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import anyQueueItemsListPrisma from "../../utils/db/anyQueueItem/anyQueueItemListPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import anyQueueItemViewer from "../../view/anyQueueItemViewer";

function parseAnyQueueItemListQuery(query: ParsedQs) {
  const { shopId } = query;
  const shopIdNumber = shopId ? parseInt(shopId as string) : undefined;
  return { shopIdNumber };
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
  const {
    shopIdNumber
  } = parseAnyQueueItemListQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the anyQueueItems
    const anyQueueItems = await anyQueueItemsListPrisma(shopIdNumber);

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

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import queuesListPrisma from "../../utils/db/queue/queueListPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import queueViewer from "../../view/queueViewer";

function parseQueueListQuery(query: ParsedQs) {
  const { shopId } = query;
  return { shopId };
}

/**
 * Queue controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { shopId } = parseQueueListQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the queues
    const queues = await queuesListPrisma(shopId);

    // Create queues view
    const queuesListView = queues.map((queue) =>
      currentUser ? queueViewer(queue, currentUser) : queueViewer(queue)
    );

    return res.json({
      queues: queuesListView,
      queuesCount: queuesListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

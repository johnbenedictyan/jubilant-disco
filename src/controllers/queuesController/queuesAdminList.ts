import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueAdminListPrisma from "../../utils/db/queue/queueAdminListPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueViewer from "../../view/queueViewer";

/**
 * Queue controller that must receive a request.
 * The parameters of the request must have a queueId.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesAdminList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    if (!currentUser) return res.sendStatus(401);

    // Get the queue
    const queues = await queueAdminListPrisma(currentUser.username);

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

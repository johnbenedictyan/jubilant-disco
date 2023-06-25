import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueGetPrisma from "../../utils/db/queue/queueGetPrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueViewer from "../../view/queueViewer";
import queueGetShortestPrisma from "../../utils/db/queue/queueGetShortestPrisma";

/**
 * Queue controller that must receive a request.
 * The parameters of the request must have a queueHash.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesGetShortest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const shopId = Number(req.params.shopId);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the queue
    const queue = await queueGetShortestPrisma(shopId);
    if (!queue) return res.sendStatus(404);

    // Create the queue view
    const queueView = currentUser
      ? queueViewer(queue, currentUser)
      : queueViewer(queue);
    return res.status(200).json({ queue: queueView });
  } catch (error) {
    return next(error);
  }
}

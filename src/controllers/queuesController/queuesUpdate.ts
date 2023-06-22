import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueUpdatePrisma from "../../utils/db/queue/queueUpdatePrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueViewer from "../../view/queueViewer";

/**
 * Queue controller that must receive a request with an authenticated user.
 * The parameters of the request must have a queueHash.
 * The body of the request must have an queue object with title, description and body.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const queueHash = req.params.queueHash;
  const { name } = req.body.queue;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Update the queue
    const queue = await queueUpdatePrisma(queueHash, {
      name,
    });

    // Create the queue view
    const queueView = queueViewer(queue, currentUser);
    return res.status(200).json({ queue: queueView });
  } catch (error) {
    return next(error);
  }
}

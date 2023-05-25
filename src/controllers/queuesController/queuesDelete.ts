import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueDeletePrisma from "../../utils/db/queue/queueDeletePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import queueViewer from "../../view/queueViewer";

/**
 * Queue controller that must receive a request with an authenticated user.
 * The parameters of the request must have a queueHash.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const queueHash = req.params.queueHash;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Delete the queue
    const queue = await queueDeletePrisma(queueHash);

    // Create the deleted queue view
    const queueView = queueViewer(queue, currentUser);
    return res.status(200).json({ queue: queueView });
  } catch (error) {
    return next(error);
  }
}

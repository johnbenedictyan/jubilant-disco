import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueCreatePrisma from "../../utils/db/queue/queueCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import queueViewer from "../../view/queueViewer";

interface queue {
  queueHash: string;
  name: string;
  shopId: number;
}

/**
 * queue controller that must receive a request with an authenticated user.
 * The body of the request must have the queue object that is an @interface queue.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { queueHash, name, shopId }: queue = req.body.queue;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create the queue
    const queue = await queueCreatePrisma({ queueHash, name, shopId });

    // Create queue view
    const queueView = queueViewer(queue, currentUser);
    return res.status(201).json({ queue: queueView });
  } catch (error) {
    return next(error);
  }
}

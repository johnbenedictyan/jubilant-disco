import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import queueItemDeletePrisma from "../../utils/db/queueItem/queueItemDeletePrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import queueItemViewer from "../../view/queueItemViewer";

/**
 * queueItem controller that must receive a request with an authenticated user.
 * The parameters of the request must have a queueItemHash.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queueItemsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userUsername = req.params.userUsername;
  const queueHash = req.params.queueHash;

  const loggedInUsername = req.auth?.user?.username;

  let authFlag = false;

  try {
    // Get the current logined user
    const currentUser = await userGetPrisma(loggedInUsername);

    // Get the user in whose queue item is being deleted
    const requestedUser = await userGetPrisma(userUsername);

    if (!requestedUser) return res.sendStatus(401);

    if (currentUser) {
      authFlag = authFlag || currentUser.role == "admin";
    }

    if (!authFlag) return res.sendStatus(401);

    // Delete the queueItem
    const queueItem = await queueItemDeletePrisma({
      userUsername,
      queueHash,
    });

    // Create the deleted queueItem view
    const queueItemView = queueItemViewer(queueItem, currentUser);
    return res.status(200).json({ queueItem: queueItemView });
  } catch (error) {
    return next(error);
  }
}

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import shopGetPrisma from "../../utils/db/shop/shopGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import shopViewer from "../../view/shopViewer";

/**
 * Shop controller that must receive a request.
 * The parameters of the request must have an id.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the shop
    const shop = await shopGetPrisma(id);
    if (!shop) return res.sendStatus(404);

    // Create the shop view
    const shopView = currentUser
      ? shopViewer(shop, currentUser)
      : shopViewer(shop);
    return res.status(200).json({ shop: shopView });
  } catch (error) {
    return next(error);
  }
}

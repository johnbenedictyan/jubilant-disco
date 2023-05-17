import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import shopDeletePrisma from "../../utils/db/shop/shopDeletePrisma";
import shopGetPrisma from "../../utils/db/shop/shopGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import shopViewer from "../../view/shopViewer";

/**
 * Shop controller that must receive a request with an authenticated user.
 * The parameters of the request must have an id.
 * @param req Request with a jwt token verified
 * @param res Responses
 * @param next NextFunction
 * @returns void
 */
export default async function shopsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Get the shop
    const shop = await shopGetPrisma(id);
    if (!shop) return res.sendStatus(404);

    // Delete the shop
    await shopDeletePrisma(id);

    // Create the deleted shop view
    const shopView = shopViewer(shop, currentUser);
    return res.status(200).json({ shop: shopView });
  } catch (error) {
    return next(error);
  }
}

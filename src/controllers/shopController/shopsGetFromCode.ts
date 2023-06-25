import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import shopGetFromCodePrisma from "../../utils/db/shop/shopGetFromCodePrisma";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import shopViewer from "../../view/shopViewer";

/**
 * Shop controller that must receive a request.
 * The parameters of the request must have an code.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsGetFromCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = req.params.code;
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the shop
    const shop = await shopGetFromCodePrisma(code);
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

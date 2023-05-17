import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import shopFavoritePrisma from "../../utils/db/shop/shopFavoritePrisma";
import shopGetPrisma from "../../utils/db/shop/shopGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import shopViewer from "../../view/shopViewer";

/**
 * Shop controller that must receive a request with an authenticated user.
 * The parameters of the request must have an id.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const username = req.auth?.user.username;

  try {
    // Get current user
    let currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Get the shop
    const shop = await shopGetPrisma(id);
    if (!shop) return res.sendStatus(404);

    // Favorite the shop
    await shopFavoritePrisma(currentUser, id);

    // Retrieve current user after update of its favorited shops
    currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(500); // The user should not have disappeared after having favorited an shop

    // Create shop view
    const shopView = shopViewer(shop, currentUser);
    return res.json({ shop: shopView });
  } catch (error) {
    next(error);
  }
}

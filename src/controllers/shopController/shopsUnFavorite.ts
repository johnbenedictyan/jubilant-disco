import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';

import shopUnFavoritePrisma from '../../utils/db/shop/shopUnFavoritePrisma';
import userGetPrisma from '../../utils/db/user/userGetPrisma';
import shopViewer from '../../view/shopViewer';

/**
 * Shop controller that must receive a request with an authenticated user.
 * The parameters of the request must have a id.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsUnFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    let currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // UnFavorite the shop
    const shop = await shopUnFavoritePrisma(currentUser, id);
    if (!shop) return res.sendStatus(404);

    // Retrieve current user after update of its favorited shops
    currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(500); // The user should not have disappeared after having un-favorited an shop

    // Create shop view
    const shopView = shopViewer(shop, currentUser);
    return res.json({ shop: shopView });
  } catch (error) {
    next(error);
  }
}

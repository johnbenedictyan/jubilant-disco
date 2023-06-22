import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';

import shopGetPrisma from '../../utils/db/shop/shopGetPrisma';
import shopUpdatePrisma from '../../utils/db/shop/shopUpdatePrisma';
import userGetPrisma from '../../utils/db/users/usersGetPrisma';
import shopViewer from '../../view/shopViewer';

/**
 * Shop controller that must receive a request with an authenticated user.
 * The parameters of the request must have a id.
 * The body of the request must have an shop object with title, description and body.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const { name, addressField1, addressField2, addressField3, postalCode } =
    req.body.shop;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Get the shop
    const shop = await shopGetPrisma(id);
    if (!shop) return res.sendStatus(404);

    // Update the shop
    const updatedShop = await shopUpdatePrisma(id, {
      name,
      addressField1,
      addressField2,
      addressField3,
      postalCode,
    });

    // Create the shop view
    const shopView = shopViewer(updatedShop, currentUser);
    return res.status(200).json({ shop: shopView });
  } catch (error) {
    return next(error);
  }
}

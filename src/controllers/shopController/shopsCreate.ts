import { Tag } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';

import shopCreatePrisma from '../../utils/db/shop/shopCreatePrisma';
import tagsCreatePrisma from '../../utils/db/tag/tagsCreatePrisma';
import userGetPrisma from '../../utils/db/user/userGetPrisma';
import shopViewer from '../../view/shopViewer';

interface Shop {
  name: string;
  addressField1: string;
  addressField2: string;
  addressField3: string;
  postalCode: number;
  tagList?: Array<string>;
}

/**
 * Shop controller that must receive a request with an authenticated user.
 * The body of the request must have the shop object that is an @interface Shop.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    addressField1,
    addressField2,
    addressField3,
    postalCode,
    tagList,
  }: Shop = req.body.shop;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create list of tags
    let tags: Tag[] = [];
    if (tagList && tagList.length > 0) {
      tags = await tagsCreatePrisma(tagList);
    }

    // Create the shop
    const shop = await shopCreatePrisma(
      {
        name,
        addressField1,
        addressField2,
        addressField3,
        postalCode,
      },
      tags
    );

    // Create shop view
    const shopView = shopViewer(shop, currentUser);
    return res.status(201).json({ shop: shopView });
  } catch (error) {
    return next(error);
  }
}

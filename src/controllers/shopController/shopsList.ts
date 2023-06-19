import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import shopsListPrisma from "../../utils/db/shop/shopListPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import shopViewer from "../../view/shopViewer";

function parseShopListQuery(query: ParsedQs) {
  let {
    name,
    addressField1,
    addressField2,
    addressField3,
    postalCode,
    tag,
    author,
    favorited,
  } = query;
  const { limit, offset } = query;
  name = name ? (name as string) : undefined;
  addressField1 = addressField1 ? (addressField1 as string) : undefined;
  addressField2 = addressField2 ? (addressField2 as string) : undefined;
  addressField3 = addressField3 ? (addressField3 as string) : undefined;
  postalCode = postalCode ? (postalCode as string) : undefined;
  favorited = favorited ? (favorited as string) : undefined;
  tag = tag ? (tag as string) : undefined;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return {
    name,
    addressField1,
    addressField2,
    addressField3,
    postalCode,
    tag,
    author,
    favorited,
    limit: limitNumber,
    offset: offsetNumber,
  };
}

/**
 * Shop controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsList(
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
    tag,
    favorited,
    limit,
    offset,
  } = parseShopListQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the shops
    const shops = await shopsListPrisma(
      name,
      addressField1,
      addressField2,
      addressField3,
      postalCode,
      tag,
      favorited,
      limit,
      offset
    );

    // Create shops view
    const shopsListView = shops.map((shop) =>
      currentUser ? shopViewer(shop, currentUser) : shopViewer(shop)
    );

    return res.json({
      shops: shopsListView,
      shopsCount: shopsListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

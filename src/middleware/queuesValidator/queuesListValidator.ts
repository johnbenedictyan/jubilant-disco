import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate request properties for queues listing controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function queuesListValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { shopId } = req.query;
  const errors: ValidationError = {};
  errors.query = [];

  if (shopId && typeof shopId == "string") {
    const shopIdValue = parseInt(shopId);
    if (isNaN(shopIdValue))
      errors.query.push("Postal Code is not a valid number");
  }

  if (errors.query.length > 0) return res.json({ errors });
  return next();
}

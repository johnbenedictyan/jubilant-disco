import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate request properties for shops listing controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function shopsListValidator(
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
  } = req.query;
  const errors: ValidationError = {};
  errors.query = [];

  if (name && typeof name != "string")
    errors.query.push("Shop Name must be a string");

  if (addressField1 && typeof addressField1 != "string")
    errors.query.push("Address Field 1 must be a string");

  if (addressField2 && typeof addressField2 != "string")
    errors.query.push("Address Field 2 must be a string");

  if (addressField3 && typeof addressField3 != "string")
    errors.query.push("Address Field 3 must be a string");

  if (postalCode && typeof postalCode != "string")
    errors.query.push("Postal Code must be a string");

  if (postalCode && typeof postalCode == "string") {
    const postalCodeValue = parseInt(postalCode);
    if (isNaN(postalCodeValue))
      errors.query.push("Postal Code is not a valid number");
  }

  if (tag && typeof tag != "string") errors.query.push("tag must be a string");

  if (favorited && typeof favorited != "string")
    errors.query.push("favorited must be a string");

  if (limit && typeof limit != "string")
    errors.query.push("limit must be a string");

  if (limit && typeof limit == "string") {
    const limitValue = parseInt(limit);
    if (isNaN(limitValue)) errors.query.push("limit is not a valid number");
  }

  if (offset && typeof offset != "string")
    errors.query.push("offset must be a string");

  if (offset && typeof offset == "string") {
    const offsetValue = parseInt(offset);
    if (isNaN(offsetValue)) errors.query.push("offset is not a valid number");
  }

  if (errors.query.length > 0) return res.json({ errors });
  return next();
}

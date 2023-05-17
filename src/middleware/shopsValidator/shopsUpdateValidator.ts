import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate request properties for shops update controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function shopsUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors: ValidationError = {};
  errors.body = [];
  if (!req.body) {
    errors.body.push("can't be empty");
    return res.status(400).json({ errors });
  }

  if (!req.body.shop && typeof req.body.shop != "object") {
    errors.body.push("shop must be an object inside body");
    return res.status(400).json({ errors });
  }

  const { name, addressField1, addressField2, addressField3, postalCode } =
    req.body.shop;

  if (name && typeof name != "string")
    errors.body.push("Shop name must be a string");

  if (addressField1 && typeof addressField1 != "string")
    errors.body.push("Address Field 1 must be a string");

  if (addressField2 && typeof addressField2 != "string")
    errors.body.push("Address Field 2 must be a string");

  if (addressField3 && typeof addressField3 != "string")
    errors.body.push("Address Field 3 must be a string");

  if (postalCode && typeof postalCode != "string")
    errors.body.push("Postal Code must be a string");

  if (postalCode && typeof postalCode == "string") {
    const postalCodeValue = parseInt(postalCode);
    if (isNaN(postalCodeValue))
      errors.body.push("Postal Code is not a valid number");
  }

  if (errors.body.length) return res.status(400).json({ errors });

  next();
}

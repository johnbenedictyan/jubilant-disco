import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate input for shop creation controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function shopsCreateValidator(
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

  const {
    name,
    addressField1,
    addressField2,
    addressField3,
    postalCode,
    tagList,
  } = req.body.shop;

  // Checks if title description and body are present and non-empty strings.
  const requiredStringChecks = {
    name,
    addressField1,
    addressField2,
    addressField3,
  };
  for (const [variable, content] of Object.entries(requiredStringChecks)) {
    if (typeof content != "string" || content.length == 0) {
      errors.body.push(`${variable} field must be a non-empty string`);
    }
  }

  const requiredNumberChecks = {
    postalCode,
  };
  for (const [variable, content] of Object.entries(requiredNumberChecks)) {
    if (typeof content != "number") {
      errors.body.push(`${variable} field must be a valid number`);
    }
  }

  // Checks if tagList is an array of strings in case it is not undefined.
  if (tagList && !Array.isArray(tagList))
    errors.body.push("tagList must be an array of non-empty strings");
  else if (tagList) {
    let foundError = false;
    for (const tag of tagList) {
      if (typeof tag != "string" || tag.length == 0) {
        foundError = true;
      }
    }
    if (foundError)
      errors.body.push("tagList must be an array of non-empty strings");
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}

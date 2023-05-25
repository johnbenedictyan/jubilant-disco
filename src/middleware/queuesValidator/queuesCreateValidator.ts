import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate input for queue creation controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function queuesCreateValidator(
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

  if (!req.body.queue && typeof req.body.queue != "object") {
    errors.body.push("queue must be an object inside body");
    return res.status(400).json({ errors });
  }

  const { name } = req.body.queue;

  // Checks if title description and body are present and non-empty strings.
  const requiredStringChecks = {
    name,
  };
  for (const [variable, content] of Object.entries(requiredStringChecks)) {
    if (typeof content != "string" || content.length == 0) {
      errors.body.push(`${variable} field must be a non-empty string`);
    }
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}

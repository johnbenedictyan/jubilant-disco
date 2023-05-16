import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate request properties for reviews update controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function reviewsUpdateValidator(
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

  if (!req.body.review && typeof req.body.review != "object") {
    errors.body.push("review must be an object inside body");
    return res.status(400).json({ errors });
  }

  const { title, description, body } = req.body.review;

  if (title && typeof title != "string")
    errors.body.push("title must be a string");

  if (description && typeof description != "string")
    errors.body.push("description must be a string");

  if (body && typeof body != "string")
    errors.body.push("body must be a string");

  if (errors.body.length) return res.status(400).json({ errors });

  next();
}

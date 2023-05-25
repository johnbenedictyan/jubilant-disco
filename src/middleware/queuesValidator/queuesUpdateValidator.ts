import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

import { ValidationError } from "../../utils/types";

/**
 * Middleware to validate request properties for queues update controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function queuesUpdateValidator(
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

  if (name && typeof name != "string")
    errors.body.push("Queue name must be a string");

  if (errors.body.length) return res.status(400).json({ errors });

  next();
}

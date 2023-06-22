import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";

import createUserToken from "../../utils/auth/createUserToken";
import userGetPrisma from "../../utils/db/users/usersGetPrisma";
import usersListPrisma from "../../utils/db/users/usersListPrisma";
import userViewer from "../../view/userViewer";

function parseUserListQuery(query: ParsedQs) {
  let {} = query;
  const { limit, offset } = query;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return {
    limit: limitNumber,
    offset: offsetNumber,
  };
}

/**
 * User controller that must receive a request.
 * @param req Request with an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function usersList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { limit, offset } = parseUserListQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the users
    const users = await usersListPrisma(limit, offset);

    // Create users view
    const usersListView = users.map((user) =>
      userViewer(user, createUserToken(user))
    );

    return res.json({
      users: usersListView,
      usersCount: usersListView.length,
    });
  } catch (error) {
    return next(error);
  }
}

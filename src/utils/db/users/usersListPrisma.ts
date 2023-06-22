import prisma from "../prisma";

export default async function usersListPrisma(limit = 20, offset = 0) {
  const users = await prisma.user.findMany({
    take: limit,
    skip: offset,
  });
  return users;
}

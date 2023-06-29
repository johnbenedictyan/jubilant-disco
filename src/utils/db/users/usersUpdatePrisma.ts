import prisma from "../prisma";

interface UpdateFields {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
}

export default async function userUpdatePrisma(
  email: string,
  info: UpdateFields
) {
  if (!email) return null;
  const user = await prisma.user.update({ where: { email }, data: info });
  return user;
}

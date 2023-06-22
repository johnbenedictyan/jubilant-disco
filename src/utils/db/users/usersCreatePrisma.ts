import prisma from "../prisma";

export default async function userCreatePrisma(
  username: string,
  email: string,
  password: string,
  role: string
) {
  const user = await prisma.user.create({
    data: { username, email, password, role },
  });
  return user;
}

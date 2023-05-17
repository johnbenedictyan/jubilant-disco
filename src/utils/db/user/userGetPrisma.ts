import prisma from "../prisma";

export default async function userGetPrisma(username: string) {
  if (!username) return null;
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      follows: true,
      followedBy: true,
      authored: true,
      likes: true,
      favoriteShops: true,
    },
  });
  return user;
}

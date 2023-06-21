import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function shopFavoritePrisma(
  currentUser: User,
  id: number
) {
  const shop = await prisma.shop.update({
    where: { id },
    data: { favoritedBy: { connect: { username: currentUser.username } } },
    include: {
      tagList: true,
      _count: { select: { favoritedBy: true, anyQueueList: true } },
    },
  });
  return shop;
}

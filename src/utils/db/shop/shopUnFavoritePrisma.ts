import { User } from "@prisma/client";

import prisma from "../prisma";

export default async function shopUnFavoritePrisma(
  currentUser: User,
  id: number
) {
  const shop = await prisma.shop.update({
    where: { id },
    data: { favoritedBy: { disconnect: { username: currentUser.username } } },
    include: {
      tagList: true,
      anyQueueList: true,
      _count: { select: { favoritedBy: true, anyQueueList: true } },
    },
  });
  return shop;
}

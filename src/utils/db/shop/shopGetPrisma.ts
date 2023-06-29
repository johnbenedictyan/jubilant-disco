import prisma from "../prisma";

export default async function shopGetPrisma(id: number) {
  if (!id) return null;
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: {
      queueList: {
        include: {
          queueItemList: true,
          _count: { select: { queueItemList: { where: { valid: true } } } },
        },
      },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return shop;
}

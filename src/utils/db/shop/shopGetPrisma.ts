import prisma from '../prisma';

export default async function shopGetPrisma(id: number) {
  if (!id) return null;
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: {
      queueList: true,
      queueItemList: true,
      tagList: true,
      _count: { select: { favoritedBy: true, queueItemList: true } },
    },
  });
  return shop;
}

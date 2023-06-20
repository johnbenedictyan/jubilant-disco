import prisma from '../prisma';

export default async function shopDeletePrisma(id: number) {
  const shop = await prisma.shop.delete({
    where: { id },
    include: {
      tagList: true,
      _count: { select: { favoritedBy: true, queueItemList: true } },
    },
  });
  return shop;
}

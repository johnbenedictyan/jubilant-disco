import prisma from "../prisma";

export default async function shopGetFromCodePrisma(code: string) {
  if (!code) return null;
  const shop = await prisma.shop.findUnique({
    where: { code },
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

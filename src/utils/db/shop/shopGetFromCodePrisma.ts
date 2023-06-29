import prisma from "../prisma";

export default async function shopGetFromCodePrisma(code: string) {
  if (!code) return null;
  const shop = await prisma.shop.findUnique({
    where: { code },
    include: {
      queueList: true,
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return shop;
}

import prisma from "../prisma";

export default async function queueItemsListPrisma(shopId?: number) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      shopId,
    },
    orderBy: { number: "asc" },
  });
  return queueItems;
}

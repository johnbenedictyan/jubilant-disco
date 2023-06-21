import prisma from "../prisma";

export default async function anyQueueItemsListPrisma(shopId?: number) {
  const anyQueueItems = await prisma.anyQueueItem.findMany({
    where: {
      shopId,
    },
    orderBy: { insert_date: "asc" },
  });
  return anyQueueItems;
}

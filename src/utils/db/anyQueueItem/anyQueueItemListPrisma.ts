import prisma from "../prisma";

export default async function anyQueueItemsListPrisma(
  shopId?: number,
  userUsername?: string,
  valid?: boolean
) {
  const anyQueueItems = await prisma.anyQueueItem.findMany({
    where: {
      shopId,
      userUsername,
      valid,
    },
    orderBy: { insert_date: "asc" },
  });
  return anyQueueItems;
}

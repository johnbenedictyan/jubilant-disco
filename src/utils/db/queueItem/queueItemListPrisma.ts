import prisma from "../prisma";

export default async function queueItemsListPrisma(queueHash?: string) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueHash,
    },
    orderBy: { insert_date: "asc" },
  });
  return queueItems;
}

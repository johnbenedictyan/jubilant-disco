import prisma from "../prisma";

export default async function queueItemsListPrisma(
  queueId?: number,
  userUsername?: string,
  valid?: boolean
) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueId,
      userUsername,
      valid,
    },
    orderBy: { insert_date: "asc" },
  });
  return queueItems;
}

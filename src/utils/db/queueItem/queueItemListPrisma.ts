import prisma from "../prisma";

export default async function queueItemsListPrisma(
  queueHash?: string,
  userUsername?: string,
  valid?: boolean
) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueHash,
      userUsername,
      valid,
    },
    orderBy: { insert_date: "asc" },
  });
  return queueItems;
}

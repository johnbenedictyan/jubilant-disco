import prisma from "../prisma";

export default async function queueItemsJoinedListPrisma(
  queueId: number,
  uuid: string
) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueId,
      uuid,
      valid: true,
    },
    orderBy: { insert_date: "asc" },
  });
  return queueItems;
}

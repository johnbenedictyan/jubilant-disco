import prisma from "../prisma";

export default async function queueItemsListPrisma(
  queueId?: number,
  uuid?: string,
  valid?: boolean
) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueId,
      uuid,
      valid,
    },
    orderBy: [{ current: "desc" }, { insert_date: "asc" }],
  });
  return queueItems;
}

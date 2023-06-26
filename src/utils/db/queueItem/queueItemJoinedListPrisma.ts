import prisma from "../prisma";

export default async function queueItemsJoinedListPrisma(uuid: string) {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      uuid,
      valid: true,
    },
    orderBy: { insert_date: "asc" },
  });
  return queueItems;
}

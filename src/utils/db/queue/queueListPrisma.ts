import prisma from "../prisma";

export default async function queuesListPrisma(shopId?: number) {
  const queues = await prisma.queue.findMany({
    where: {
      shopId,
    },
    orderBy: { name: "desc" },
    include: {
      queueItemList: true,
      _count: { select: { queueItemList: { where: { valid: true } } } },
    },
  });
  return queues;
}

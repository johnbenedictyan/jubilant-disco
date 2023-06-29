import prisma from "../prisma";

export default async function queueGetShortestPrisma(shopId: number) {
  const queue = await prisma.queue.findFirst({
    where: { shopId },
    orderBy: {
      queueItemList: {
        _count: "asc",
      },
    },
    include: {
      queueItemList: {
        orderBy: {
          insert_date: "asc",
        },
      },
      _count: { select: { queueItemList: { where: { valid: true } } } },
    },
  });
  return queue;
}

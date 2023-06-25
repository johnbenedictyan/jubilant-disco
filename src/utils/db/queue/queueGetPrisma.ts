import prisma from "../prisma";

export default async function queueGetPrisma(id: number) {
  const queue = await prisma.queue.findUnique({
    where: { id },
    include: {
      queueItemList: {
        orderBy: {
          insert_date: "asc",
        },
      },
      _count: { select: { queueItemList: true } },
    },
  });
  return queue;
}

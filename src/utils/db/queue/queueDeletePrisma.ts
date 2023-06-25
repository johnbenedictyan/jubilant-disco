import prisma from "../prisma";

export default async function queueDeletePrisma(id: number) {
  const queue = await prisma.queue.delete({
    where: { id },
    include: {
      queueItemList: true,
      _count: { select: { queueItemList: true } },
    },
  });
  return queue;
}

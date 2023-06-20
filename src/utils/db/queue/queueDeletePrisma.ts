import prisma from "../prisma";

export default async function queueDeletePrisma(hash: string) {
  const queue = await prisma.queue.delete({
    where: { hash },
    include: {
      queueItemList: true,
      _count: { select: { queueItemList: true } },
    },
  });
  return queue;
}

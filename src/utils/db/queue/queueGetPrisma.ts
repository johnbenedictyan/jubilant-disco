import prisma from "../prisma";

export default async function queueGetPrisma(hash: string) {
  const queue = await prisma.queue.findUnique({
    where: { hash },
    include: {
      queueItemList: true,
      _count: { select: { queueItemList: true } },
    },
  });
  return queue;
}

import prisma from "../prisma";

export default async function queueDeletePrisma(queueHash: string) {
  const queue = await prisma.queue.delete({
    where: { queueHash },
  });
  return queue;
}

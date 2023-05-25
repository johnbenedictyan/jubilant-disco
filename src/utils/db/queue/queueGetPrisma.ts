import prisma from "../prisma";

export default async function queueGetPrisma(queueHash: string) {
  const queue = await prisma.queue.findUnique({
    where: { queueHash },
  });
  return queue;
}

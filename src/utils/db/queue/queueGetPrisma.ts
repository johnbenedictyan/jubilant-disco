import prisma from "../prisma";

export default async function queueGetPrisma(hash: string) {
  const queue = await prisma.queue.findUnique({
    where: { hash },
  });
  return queue;
}

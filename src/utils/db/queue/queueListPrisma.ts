import prisma from "../prisma";

export default async function queuesListPrisma(shopId?: number) {
  const queues = await prisma.queue.findMany({
    where: {
      shopId,
    },
    orderBy: { name: "desc" },
  });
  return queues;
}

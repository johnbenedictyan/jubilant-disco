import prisma from "../prisma";

interface RequiredFields {
  id: number;
  name: string;
  shopId: number;
}

export default async function queueCreatePrisma(info: RequiredFields) {
  const queue = await prisma.queue.create({
    data: {
      ...info,
    },
    include: {
      queueItemList: true,
      _count: { select: { queueItemList: { where: { valid: true } } } },
    },
  });
  return queue;
}

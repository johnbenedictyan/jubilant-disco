import prisma from "../prisma";

interface UpdateFields {
  name: string;
}

export default async function queueUpdatePrisma(
  id: number,
  info: UpdateFields
) {
  const queue = await prisma.queue.update({
    where: { id },
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

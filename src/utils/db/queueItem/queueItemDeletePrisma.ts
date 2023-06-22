import prisma from "../prisma";

interface RequiredFields {
  id: number;
}

export default async function queueItemDeletePrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.delete({
    where: {
      ...info,
    },
  });
  return queueItem;
}

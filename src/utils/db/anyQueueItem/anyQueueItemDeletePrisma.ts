import prisma from "../prisma";

interface RequiredFields {
  id: number;
}

export default async function anyQueueItemDeletePrisma(info: RequiredFields) {
  const anyQueueItem = await prisma.anyQueueItem.delete({
    where: {
      ...info,
    },
  });
  return anyQueueItem;
}

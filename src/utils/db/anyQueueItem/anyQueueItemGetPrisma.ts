import prisma from "../prisma";

interface RequiredFields {
  id: number;
}

export default async function anyQueueItemGetPrisma(info: RequiredFields) {
  const anyQueueItem = await prisma.anyQueueItem.findUnique({
    where: {
      ...info,
    },
  });
  return anyQueueItem;
}

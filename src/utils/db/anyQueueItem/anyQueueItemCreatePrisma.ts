import prisma from "../prisma";

interface RequiredFields {
  shopId: number;
  userUsername: string;
}

export default async function anyQueueItemCreatePrisma(info: RequiredFields) {
  const anyQueueItem = await prisma.anyQueueItem.create({
    data: {
      ...info,
    },
  });
  return anyQueueItem;
}

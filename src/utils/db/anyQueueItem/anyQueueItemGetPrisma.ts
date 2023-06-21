import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  shopId: number;
}

export default async function anyQueueItemGetPrisma(info: RequiredFields) {
  const anyQueueItem = await prisma.anyQueueItem.findUnique({
    where: {
      shopId_userUsername: {
        ...info,
      },
    },
  });
  return anyQueueItem;
}

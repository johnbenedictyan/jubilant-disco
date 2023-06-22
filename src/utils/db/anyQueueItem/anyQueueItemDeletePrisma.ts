import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  shopId: number;
}

export default async function anyQueueItemDeletePrisma(info: RequiredFields) {
  const anyQueueItem = await prisma.anyQueueItem.delete({
    where: {
      shopId_userUsername: {
        ...info,
      },
    },
  });
  return anyQueueItem;
}

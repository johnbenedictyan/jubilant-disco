import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  shopId: number;
}

export default async function queueItemDeletePrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.delete({
    where: {
      shopId_userUsername: {
        ...info,
      },
    },
  });
  return queueItem;
}

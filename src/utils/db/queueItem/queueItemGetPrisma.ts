import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  shopId: number;
}

export default async function queueItemGetPrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.findUnique({
    where: {
      shopId_userUsername: {
        ...info,
      },
    },
  });
  return queueItem;
}

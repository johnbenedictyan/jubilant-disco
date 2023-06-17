import prisma from "../prisma";

interface RequiredFields {
  queueHash?: string;
  userUsername: string;
  shopId: number;
  number: number;
}

export default async function queueItemCreatePrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.create({
    data: {
      ...info,
    },
  });
  return queueItem;
}

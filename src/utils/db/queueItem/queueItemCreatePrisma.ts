import prisma from "../prisma";

interface RequiredFields {
  queueId: number;
  userUsername: string;
}

export default async function queueItemCreatePrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.create({
    data: {
      ...info,
    },
  });
  return queueItem;
}

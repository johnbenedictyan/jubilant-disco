import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  queueHash: string;
}

export default async function queueItemGetPrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.findUnique({
    where: {
      queueHash_userUsername: {
        ...info,
      },
    },
  });
  return queueItem;
}

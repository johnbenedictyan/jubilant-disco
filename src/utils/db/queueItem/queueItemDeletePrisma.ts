import prisma from "../prisma";

interface RequiredFields {
  userUsername: string;
  queueHash: string;
}

export default async function queueItemDeletePrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.delete({
    where: {
      queueHash_userUsername: {
        ...info,
      },
    },
  });
  return queueItem;
}

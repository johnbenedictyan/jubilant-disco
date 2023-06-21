import prisma from "../prisma";

interface UpdateFields {
  valid: boolean;
}

export default async function queueItemUpdatePrisma(
  userUsername: string,
  queueHash: string,
  info: UpdateFields
) {
  const queueItem = await prisma.queueItem.update({
    where: {
      queueHash_userUsername: {
        userUsername,
        queueHash,
      },
    },
    data: {
      ...info,
    },
  });
  return queueItem;
}

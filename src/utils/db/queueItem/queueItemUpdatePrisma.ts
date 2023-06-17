import prisma from "../prisma";

interface UpdateFields {
  number: number;
}

export default async function queueItemUpdatePrisma(
  userUsername: string,
  shopId: number,
  info: UpdateFields
) {
  const queueItem = await prisma.queueItem.update({
    where: {
      shopId_userUsername: {
        userUsername,
        shopId,
      },
    },
    data: {
      ...info,
    },
  });
  return queueItem;
}

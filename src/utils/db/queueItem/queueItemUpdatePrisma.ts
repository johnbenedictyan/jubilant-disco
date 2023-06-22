import prisma from "../prisma";

interface UpdateFields {
  valid: boolean;
}

export default async function queueItemUpdatePrisma(
  id: number,
  info: UpdateFields
) {
  const queueItem = await prisma.queueItem.update({
    where: {
      id,
    },
    data: {
      ...info,
    },
  });
  return queueItem;
}

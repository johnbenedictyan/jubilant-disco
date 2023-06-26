import prisma from "../prisma";

interface UpdateFields {
  valid: boolean;
  name: string;
  phoneNumber: string;
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

import prisma from "../prisma";

interface RequiredFields {
  id: number;
}

export default async function queueItemGetPrisma(info: RequiredFields) {
  const queueItem = await prisma.queueItem.findUnique({
    where: {
      ...info,
    },
  });
  return queueItem;
}

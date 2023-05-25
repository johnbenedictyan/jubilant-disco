import prisma from "../prisma";

interface UpdateFields {
  name: string;
}

export default async function queueUpdatePrisma(
  queueHash: string,
  info: UpdateFields
) {
  const queue = await prisma.queue.update({
    where: { queueHash },
    data: {
      ...info,
    },
  });
  return queue;
}

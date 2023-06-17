import prisma from "../prisma";

interface UpdateFields {
  name: string;
}

export default async function queueUpdatePrisma(
  hash: string,
  info: UpdateFields
) {
  const queue = await prisma.queue.update({
    where: { hash },
    data: {
      ...info,
    },
  });
  return queue;
}

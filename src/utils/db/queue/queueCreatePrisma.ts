import prisma from "../prisma";

interface RequiredFields {
  hash: string;
  name: string;
  shopId: number;
}

export default async function queueCreatePrisma(info: RequiredFields) {
  const queue = await prisma.queue.create({
    data: {
      ...info,
    },
  });
  return queue;
}

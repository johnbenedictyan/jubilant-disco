import prisma from "../prisma";

export default async function queueAdminListPrisma(userUsername: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: userUsername,
    },
    include: {
      adminedShops: {
        include: {
          queueList: {
            include: {
              queueItemList: true,
              _count: { select: { queueItemList: { where: { valid: true } } } },
            },
          },
        },
      },
    },
  });
  if (!user) {
    return [];
  } else {
    const queues = user.adminedShops.flatMap((shop) => shop.queueList);
    return queues;
  }
}

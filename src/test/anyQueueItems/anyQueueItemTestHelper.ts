import { Shop, User } from '@prisma/client';

import prisma from '../../utils/db/prisma';

const createTestAnyQueueItem = async (testUser: User, testShop: Shop) => {
  const testAnyQueueItem = await prisma.anyQueueItem.create({
    data: {
      User: {
        connect: {
          username: testUser.username,
        },
      },
      Shop: {
        connect: {
          id: testShop.id,
        },
      },
    },
  });
  return testAnyQueueItem;
};

const deleteTestAnyQueueItem = async (testUser: User, testShop: Shop) => {
  const testAnyQueueItem = await prisma.anyQueueItem.delete({
    where: {
      shopId_userUsername: {
        shopId: testShop.id,
        userUsername: testUser.username,
      },
    },
  });
  return testAnyQueueItem;
};

import { Shop, User } from "@prisma/client";

import prisma from "../../utils/db/prisma";

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

const deleteTestAnyQueueItem = async (id: number) => {
  const testAnyQueueItem = await prisma.anyQueueItem.delete({
    where: {
      id,
    },
  });
  return testAnyQueueItem;
};

export { createTestAnyQueueItem, deleteTestAnyQueueItem };

import { Queue, User } from "@prisma/client";

import prisma from "../../utils/db/prisma";

const createTestQueueItem = async (testUser: User, testQueue: Queue) => {
  const testQueueItem = await prisma.queueItem.create({
    data: {
      Queue: {
        connect: {
          id: testQueue.id,
        },
      },
    },
  });
  return testQueueItem;
};

const deleteTestQueueItem = async (id: number) => {
  const testQueueItem = await prisma.queueItem.delete({
    where: {
      id,
    },
  });
  return testQueueItem;
};

export { createTestQueueItem, deleteTestQueueItem };

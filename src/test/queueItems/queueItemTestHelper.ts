import { Queue, User } from '@prisma/client';

import prisma from '../../utils/db/prisma';

const createTestQueueItem = async (testUser: User, testQueue: Queue) => {
  const testQueueItem = await prisma.queueItem.create({
    data: {
      User: {
        connect: {
          username: testUser.username,
        },
      },
      Queue: {
        connect: {
          hash: testQueue.hash,
        },
      },
    },
  });
  return testQueueItem;
};

const deleteTestQueueItem = async (testUser: User, testQueue: Queue) => {
  const testQueueItem = await prisma.queueItem.delete({
    where: {
      queueHash_userUsername: {
        queueHash: testQueue.hash,
        userUsername: testUser.username,
      },
    },
  });
  return testQueueItem;
};

export {
    createTestQueueItem,
    deleteTestQueueItem
};

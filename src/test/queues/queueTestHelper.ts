import { Queue, Shop } from '@prisma/client';

import prisma from '../../utils/db/prisma';

const TEST_QUEUE: Queue = {
  hash: "123abc",
  name: "Test Queue",
  shopId: 0,
  visible: true,
};

const createTestQueue = async (testShop: Shop) => {
  const testQueue = await prisma.queue.create({
    data: {
      hash: TEST_QUEUE.hash,
      name: TEST_QUEUE.name,
      Shop: {
        connect: {
          id: testShop.id,
        },
      },
      visible: TEST_QUEUE.visible,
    },
  });
  return testQueue;
};

const deleteTestQueue = async (queue: Queue) => {
  const testQueue = await prisma.queue.delete({
    where: {
      hash: TEST_QUEUE.hash,
    },
  });
  return testQueue;
};

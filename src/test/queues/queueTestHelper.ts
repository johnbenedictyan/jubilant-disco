import { Queue, Shop } from "@prisma/client";

import prisma from "../../utils/db/prisma";

const TEST_QUEUE: Queue = {
  id: 99,
  name: "Test Queue",
  shopId: 0,
  visible: true,
};

const createTestQueue = async (testShop: Shop) => {
  const testQueue = await prisma.queue.create({
    data: {
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
      id: queue.id,
    },
  });
  return testQueue;
};

export { TEST_QUEUE, createTestQueue, deleteTestQueue };

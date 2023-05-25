import { Queue, User } from "@prisma/client";

export default function queueViewer(queue: Queue, currentUser?: User) {
  const queueView = {
    queueHash: queue.queueHash,
    name: queue.name,
    shopId: queue.shopId,
  };
  return queueView;
}

import { Queue, User } from "@prisma/client";

export type QueueWithCount = Queue & {
  _count: { queueItemList: number };
};

export default function queueWithCountViewer(queue: QueueWithCount, currentUser?: User) {
  const queueView = {
    id: queue.id,
    name: queue.name,
    shopId: queue.shopId,
    queueItemCount: queue._count.queueItemList,
    visible: queue.visible,
  };
  return queueView;
}

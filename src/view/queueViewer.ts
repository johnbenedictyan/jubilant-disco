import { Queue, QueueItem, User } from "@prisma/client";

export type FullQueue = Queue & {
  queueItemList: QueueItem[];
  _count: { queueItemList: number };
};

export default function queueViewer(queue: FullQueue, currentUser?: User) {
  const queueView = {
    id: queue.id,
    name: queue.name,
    shopId: queue.shopId,
    queueItemList: queue.queueItemList,
    queueItemCount: queue._count.queueItemList,
    visible: queue.visible,
  };
  return queueView;
}

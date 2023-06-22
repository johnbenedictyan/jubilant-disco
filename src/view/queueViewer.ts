import { Queue, QueueItem, User } from "@prisma/client";

type FullQueue = Queue & {
  queueItemList: QueueItem[];
  _count: { queueItemList: number };
};

export default function queueViewer(queue: FullQueue, currentUser?: User) {
  const queueView = {
    hash: queue.hash,
    name: queue.name,
    shopId: queue.shopId,
    queueItemList: queue.queueItemList,
    queueItemCount: queue._count.queueItemList,
    visible: queue.visible
  };
  return queueView;
}

import { Queue, QueueItem, User } from "@prisma/client";

type FullQueue = Queue & {
  queueItemList: QueueItem[];
  _count: { queueItemList: number };
};

export default function queueViewer(queue: FullQueue, currentUser?: User) {
  const queueItemListView = queue.queueItemList.sort(
    (qi1, qi2) => qi1.number - qi2.number
  );

  const queueView = {
    hash: queue.hash,
    name: queue.name,
    shopId: queue.shopId,
    queueItemList: queueItemListView,
    queueItemCount: queue._count.queueItemList,
  };
  return queueView;
}

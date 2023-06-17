import { QueueItem, User } from "@prisma/client";

export default function queueItemViewer(
  queueItem: QueueItem,
  currentUser?: User
) {
  const queueItemView = {
    shopId: queueItem.shopId,
    userUsername: queueItem.userUsername,
    queueHash: queueItem.queueHash,
    number: queueItem.number,
    anyFlag: queueItem.anyFlag,
  };
  return queueItemView;
}

import { QueueItem, User } from "@prisma/client";

export default function queueItemViewer(
  queueItem: QueueItem,
  currentUser?: User
) {
  const queueItemView = {
    userUsername: queueItem.userUsername,
    queueHash: queueItem.queueHash,
    insertDate: queueItem.insert_date,
    valid: queueItem.valid,
  };
  return queueItemView;
}

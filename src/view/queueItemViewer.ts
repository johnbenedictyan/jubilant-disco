import { QueueItem, User } from "@prisma/client";

export default function queueItemViewer(
  queueItem: QueueItem,
  currentUser?: User | null
) {
  const queueItemView = {
    id: queueItem.id,
    userUsername: queueItem.userUsername,
    queueHash: queueItem.queueHash,
    insertDate: queueItem.insert_date,
    valid: queueItem.valid,
  };
  return queueItemView;
}

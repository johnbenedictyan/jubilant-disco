import { QueueItem, User } from "@prisma/client";

export default function queueItemViewer(
  queueItem: QueueItem,
  currentUser?: User | null
) {
  const queueItemView = {
    id: queueItem.id,
    queueId: queueItem.queueId,
    name: queueItem.name,
    phoneNumber: queueItem.phoneNumber,
    insertDate: queueItem.insert_date,
    valid: queueItem.valid,
    uuid: queueItem.uuid
  };
  return queueItemView;
}

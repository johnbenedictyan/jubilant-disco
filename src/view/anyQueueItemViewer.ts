import { AnyQueueItem, User } from "@prisma/client";

export default function anyQueueItemViewer(
  anyQueueItem: AnyQueueItem,
  currentUser?: User
) {
  const anyQueueItemView = {
    id: anyQueueItem.id,
    userUsername: anyQueueItem.userUsername,
    shopId: anyQueueItem.shopId,
    insertDate: anyQueueItem.insert_date,
  };
  return anyQueueItemView;
}

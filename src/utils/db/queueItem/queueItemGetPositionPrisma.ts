import { QueueItem } from "@prisma/client";
import queueItemsListPrisma from "./queueItemListPrisma";

export default async function queueItemGetPositionPrisma(queueItem: QueueItem) {
  if (queueItem.valid == false) {
    return -1;
  }

  const queueItems = await queueItemsListPrisma(
    queueItem.queueId,
    undefined,
    true
  );
  const position = queueItems.findIndex((qi) => qi.id == queueItem.id);

  return position;
}

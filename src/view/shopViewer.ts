import { AnyQueueItem, Queue, Shop, Tag, User } from "@prisma/client";

type FullShop = Shop & {
  tagList: Tag[];
  queueList: Queue[];
  anyQueueList: AnyQueueItem[];
  _count: { favoritedBy: number; anyQueueList: number };
};

export default function shopViewer(
  shop: FullShop,
  currentUser?: User & { favoriteShops: Shop[] }
) {
  const favorited = currentUser
    ? currentUser.favoriteShops.some((value) => value.id === shop.id)
    : false;

  const tagListView = shop.tagList.map((tag) => tag.tagName).sort();

  const queueListView = shop.queueList.sort((q1, q2) =>
    q1.name.localeCompare(q2.name)
  );

  const shopView = {
    id: shop.id,
    name: shop.name,
    addressField1: shop.addressField1,
    addressField2: shop.addressField2,
    addressField3: shop.addressField3,
    postalCode: shop.postalCode,
    rating: shop.rating,
    tagList: tagListView,
    queueList: queueListView,
    anyQueueList: shop.anyQueueList,
    favorited: favorited,
    favoritesCount: shop._count.favoritedBy,
    queueItemCount: shop._count.anyQueueList,
    visible: shop.visible,
    code: shop.code,
  };
  return shopView;
}

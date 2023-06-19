import { Queue, Shop, Tag, User, QueueItem } from "@prisma/client";

type FullShop = Shop & {
  tagList: Tag[];
  queueList: Queue[];
  queueItemList: QueueItem[];
  _count: { favoritedBy: number };
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

  const queueItemListView = shop.queueItemList.sort(
    (qi1, qi2) => qi1.number - qi2.number
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
    queueItemList: queueItemListView,
    favorited: favorited,
    favoritesCount: shop._count.favoritedBy,
  };
  return shopView;
}

import { Shop, Tag, User } from '@prisma/client';

type FullShop = Shop & {
  tagList: Tag[];
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

  const shopView = {
    name: shop.name,
    addressField1: shop.addressField1,
    addressField2: shop.addressField2,
    addressField3: shop.addressField3,
    postalCode: shop.postalCode,
    rating: shop.rating,
    tagList: tagListView,
    favorited: favorited,
    favoritesCount: shop._count.favoritedBy,
  };
  return shopView;
}

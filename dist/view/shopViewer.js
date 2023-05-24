"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shopViewer(shop, currentUser) {
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
exports.default = shopViewer;

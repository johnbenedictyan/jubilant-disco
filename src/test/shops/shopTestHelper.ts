import { Shop } from '@prisma/client';

import prisma from '../../utils/db/prisma';

const TEST_SHOP: Shop = {
  id: 0,
  name: "Test Shop",
  addressField1: "Test Shop Address 1",
  addressField2: "Test Shop Address 2",
  addressField3: "Test Shop Address 3",
  postalCode: "123456",
  image: "https://picsum.photos/400",
  rating: 24,
  visible: true,
  code: "SH4YF"
};

const createTestShop = async () => {
  const testShop = await prisma.shop.create({
    data: {
      name: TEST_SHOP.name,
      addressField1: TEST_SHOP.addressField1,
      addressField2: TEST_SHOP.addressField2,
      addressField3: TEST_SHOP.addressField3,
      postalCode: TEST_SHOP.postalCode,
      image: TEST_SHOP.image,
      rating: TEST_SHOP.rating,
      visible: TEST_SHOP.visible,
      code: TEST_SHOP.code,
    },
  });
  return testShop;
};

const deleteTestShop = async (shopId: number) => {
  const testShop = await prisma.shop.delete({
    where: {
      id: shopId,
    },
  });
  return testShop;
};

export {
    TEST_SHOP, createTestShop,
    deleteTestShop
};

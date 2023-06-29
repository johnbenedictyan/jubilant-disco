import { Tag } from "@prisma/client";

import prisma from "../prisma";

interface RequiredFields {
  name: string;
  addressField1: string;
  addressField2: string;
  addressField3: string;
  postalCode: string;
  code: string;
}

export default async function shopCreatePrisma(
  info: RequiredFields,
  tagList: Tag[]
) {
  const shop = await prisma.shop.create({
    data: { ...info, tagList: { connect: tagList } },
    include: {
      tagList: true,
      queueList: {
        include: {
          _count: { select: { queueItemList: { where: { valid: true } } } },
        },
      },
      _count: { select: { favoritedBy: true } },
    },
  });
  return shop;
}

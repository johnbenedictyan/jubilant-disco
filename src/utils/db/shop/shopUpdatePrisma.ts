import prisma from "../prisma";

interface UpdateFields {
  name?: string;
  addressField1?: string;
  addressField2?: string;
  addressField3?: string;
  postalCode?: string;
}

export default async function shopUpdatePrisma(id: number, info: UpdateFields) {
  const shop = await prisma.shop.update({
    where: { id },
    data: {
      ...info,
    },
    include: {
      queueList: true,
      queueItemList: true,
      tagList: true,
      _count: { select: { favoritedBy: true, queueItemList: true } },
    },
  });
  return shop;
}

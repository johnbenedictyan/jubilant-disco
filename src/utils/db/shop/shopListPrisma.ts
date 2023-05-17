import prisma from "../prisma";

export default async function shopsListPrisma(
  name?: string,
  addressField1?: string,
  addressField2?: string,
  addressField3?: string,
  postalCode?: number,
  tag?: string,
  favorited?: string,
  limit = 20,
  offset = 0
) {
  const shops = await prisma.shop.findMany({
    where: {
      name,
      addressField1,
      addressField2,
      addressField3,
      postalCode,
      tagList: tag ? { some: { tagName: tag } } : undefined,
      favoritedBy: favorited ? { some: { username: favorited } } : undefined,
    },
    take: limit,
    skip: offset,
    orderBy: { rating: "desc" },
    include: {
      queueList: true,
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return shops;
}
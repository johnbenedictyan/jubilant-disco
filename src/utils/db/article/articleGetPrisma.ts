import prisma from "../prisma";

export default async function reviewGetPrisma(slug: string) {
  const review = await prisma.review.findUnique({
    where: { slug },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return review;
}

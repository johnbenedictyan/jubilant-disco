import prisma from "../prisma";

export default async function reviewDeletePrisma(slug: string) {
  const review = await prisma.review.delete({
    where: { slug },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return review;
}

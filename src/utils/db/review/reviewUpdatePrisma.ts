import slugfy from "../../slugfy";
import prisma from "../prisma";

interface UpdateFields {
  title?: string;
  description?: string;
  body?: string;
}

export default async function reviewUpdatePrisma(
  slug: string,
  info: UpdateFields
) {
  const newSlug = slugfy(slug);
  const review = await prisma.review.update({
    where: { slug },
    data: {
      ...info,
      slug: newSlug,
      updatedAt: new Date(),
    },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { likedBy: true } },
    },
  });
  return review;
}

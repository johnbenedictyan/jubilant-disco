import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function reviewUnLikePrisma(
  currentUser: User,
  slug: string
) {
  const review = await prisma.review.update({
    where: { slug },
    data: { likedBy: { disconnect: { username: currentUser.username } } },
    include: {
      tagList: true,
      author: {
        include: { followedBy: { where: { username: currentUser.username } } },
      },
      _count: { select: { likedBy: true } },
    },
  });
  return review;
}

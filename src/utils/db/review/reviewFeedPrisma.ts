import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function reviewFeedPrisma(
  currentUser: User & { follows: User[] },
  limit = 20,
  offset = 0
) {
  const reviews = await prisma.review.findMany({
    include: {
      tagList: true,
      author: {
        include: { followedBy: { where: { username: currentUser.username } } },
      },
      _count: { select: { likedBy: true } },
    },
    take: limit,
    skip: offset,
  });
  return reviews;
}

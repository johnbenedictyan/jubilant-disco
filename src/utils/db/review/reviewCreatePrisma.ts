import { Tag } from "@prisma/client";
import slugfy from "../../slugfy";
import prisma from "../prisma";

interface RequiredFields {
  title: string;
  description: string;
  body: string;
}

export default async function reviewCreatePrisma(
  info: RequiredFields,
  tagList: Tag[],
  authorUsername: string
) {
  const slug = slugfy(info.title);
  const review = await prisma.review.create({
    data: {
      ...info,
      slug,
      authorUsername,
      tagList: { connect: tagList },
    },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { likedBy: true } },
    },
  });
  return review;
}

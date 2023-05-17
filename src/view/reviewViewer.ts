import { Review, Tag, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullReview = Review & {
  tagList: Tag[];
  author: User & { followedBy: User[] };
  _count: { likedBy: number };
};

export default function reviewViewer(
  review: FullReview,
  currentUser?: User & { likes: Review[] }
) {
  const liked = currentUser
    ? currentUser.likes.some((value) => value.slug === review.slug)
    : false;

  const tagListView = review.tagList.map((tag) => tag.tagName).sort();

  const authorView = profileViewer(review.author, currentUser);

  const reviewView = {
    slug: review.slug,
    title: review.title,
    description: review.description,
    body: review.body,
    tagList: tagListView,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    liked: liked,
    likesCount: review._count.likedBy,
    author: authorView,
  };
  return reviewView;
}

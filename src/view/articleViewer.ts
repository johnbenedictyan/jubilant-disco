import { Review, Tag, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullReview = Review & {
  tagList: Tag[];
  author: User & { followedBy: User[] };
  _count: { favoritedBy: number };
};

export default function reviewViewer(
  review: FullReview,
  currentUser?: User & { favorites: Review[] }
) {
  const favorited = currentUser
    ? currentUser.favorites.some((value) => value.slug === review.slug)
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
    favorited: favorited,
    favoritesCount: review._count.favoritedBy,
    author: authorView,
  };
  return reviewView;
}

import { IResource } from "./IResource";

export interface IResourceWithLike extends IResource {
  isLiked: boolean;
  likedId: string;
  numberOfLikes: number;
}

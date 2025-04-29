import { IResource } from "../../entities/IResource";
import { IResourceWithLike } from "../../entities/IResourceWithLike";

export const resourceWithLikeAdapter: IResourceWithLikeAdapter = ({
  userId,
  resource,
  likedResourceId,
  numberOfLikes,
}) => {
  const isLiked = !!likedResourceId;

  return {
    id: resource?.id,
    symptomId: resource?.symptomId,
    userId: userId,
    typeId: resource?.typeId,
    link: resource?.link,
    information: resource?.information,
    companyName: resource?.companyName,
    companyDetails: resource?.companyDetails,
    companyLogo: resource?.companyLogo,
    createdAt: resource?.createdAt,
    numberOfLikes: numberOfLikes,
    isLiked: isLiked,
    likedId: likedResourceId,
  };
};

interface IPayload {
  userId: string;
  resource: IResource;
  likedResourceId: string;
  numberOfLikes: number;
}

interface IResourceWithLikeAdapter {
  (props: IPayload): IResourceWithLike;
}

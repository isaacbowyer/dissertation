import { IResource } from "../../entities/IResource";
import { IResourceWithLike } from "../../entities/IResourceWithLike";
import { IUserLike } from "../../entities/IUserLike";

export const resourcesWithLikesAdapter: IResourceWithLikesAdapter = (props) => {
  const resources: IResourceWithLike[] = props?.resources?.map((doc) => {
    const resourceLike = props?.likes?.find(
      (item) => item?.resourceId === doc?.id
    );

    return {
      id: doc?.id,
      symptomId: doc?.symptomId,
      typeId: doc?.typeId,
      link: doc?.link,
      information: doc?.information,
      companyName: doc?.companyName,
      companyDetails: doc?.companyDetails,
      companyLogo: doc?.companyLogo,
      createdAt: doc?.createdAt,
      numberOfLikes: resourceLike?.numberOfLikes,
      isLiked: resourceLike?.isLiked,
      likedId: resourceLike?.likedId,
    };
  });

  return resources;
};

interface IPayload {
  userId: string;
  resources: IResource[];
  likes: IUserLike[];
}

interface IResourceWithLikesAdapter {
  (props: IPayload): IResourceWithLike[];
}

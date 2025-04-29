import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { IResource } from "../../entities/IResource";
import { resourceWithLikeAdapter } from "../../utils/resourceWithLikeAdapter";
import { IResourceWithLike } from "../../entities/IResourceWithLike";

export const getResourceLikes: IGetResourceLikesService = async (props) => {
  const likesRef = collection(db, "resource_likes");

  const docs = props?.resources;

  const resourceLikesPromises = docs?.map(async (doc) => {
    const { docs: likesDocs } = await getDocs(
      query(likesRef, where("resourceId", "==", doc?.id))
    );

    const foundDocument = likesDocs?.find(
      (doc) => doc?.data()?.userId === props?.userId
    );

    return resourceWithLikeAdapter({
      userId: props?.userId,
      resource: doc,
      likedResourceId: foundDocument?.id || "",
      numberOfLikes: likesDocs?.length || 0,
    });
  });

  const resourceLikes = await Promise.all(resourceLikesPromises);

  return resourceLikes;
};

interface IPayload {
  resources: IResource[];
  userId: string;
}

interface IGetResourceLikesService {
  (props: IPayload): Promise<IResourceWithLike[]>;
}

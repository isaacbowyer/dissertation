import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUserLike } from "../../entities/IUserLike";
import { IResource } from "../../entities/IResource";

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

    const isLiked = !!foundDocument;

    return {
      resourceId: doc?.id,
      numberOfLikes: likesDocs?.length || 0,
      isLiked: isLiked,
      likedId: isLiked ? foundDocument?.id : "",
    };
  });

  const resourceLikes = await Promise.all(resourceLikesPromises);

  return resourceLikes;
};

interface IPayload {
  resources: IResource[];
  userId: string;
}

interface IGetResourceLikesService {
  (props: IPayload): Promise<IUserLike[]>;
}

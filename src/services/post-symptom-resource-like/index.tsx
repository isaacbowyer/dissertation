import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const postSymptomResourceLike: IPostSymptomResourceLikeService = async (
  props
) => {
  const collectionRef = collection(db, "resource_likes");

  return await addDoc(collectionRef, {
    createdAt: new Date(),
    resourceId: props?.resourceId,
    userId: props?.userId,
  });
};

interface IPayload {
  resourceId: string;
  userId: string;
}

interface IPostSymptomResourceLikeService {
  (props: IPayload): Promise<any>;
}

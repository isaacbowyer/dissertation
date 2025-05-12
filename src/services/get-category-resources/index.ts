import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { resorcesAdapter } from "../../utils/resourcesAdapter";
import { IResourceResponse } from "../../entities/IResourceResponse";
import { IResourceCategory } from "../../entities/IResourceCategory";

export const getSResources: IGetResourcesService = async (props) => {
  const resourcesRef = collection(db, "symptom_resources");
  const likesRef = collection(db, "resource_likes");

  let collectionQuery = query(
    resourcesRef,
    where("symptomId", "==", props?.symptomId)
  );

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("symptomId", "==", props?.symptomId),
      where("type", "==", props?.source)
    );
  }

  const totalSnapshot = await getDocs(collectionQuery);
  const totalResources = totalSnapshot.size;

  collectionQuery = query(
    resourcesRef,
    where("symptomId", "==", props?.symptomId),
    orderBy("createdAt"),
    limit(props?.limit)
  );

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("symptomId", "==", props?.symptomId),
      where("type", "==", props?.source),
      orderBy("createdAt"),
      limit(props?.limit)
    );
  }

  let resourceSnapshot = await getDocs(collectionQuery);

  if (props?.currentPage > 1) {
    const lastVisible =
      resourceSnapshot.docs[resourceSnapshot.docs?.length - 1];

    if (props?.source === "All")
      collectionQuery = query(
        resourcesRef,
        where("symptomId", "==", props?.symptomId),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    else {
      collectionQuery = query(
        resourcesRef,
        where("symptomId", "==", props?.symptomId),
        where("type", "==", props?.source),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    }

    resourceSnapshot = await getDocs(collectionQuery);
  }

  try {
    const resourceLikesPromises = resourceSnapshot.docs?.map(async (doc) => {
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

    return {
      count: totalResources,
      results: resorcesAdapter({
        userId: props?.userId,
        resourceDocs: resourceSnapshot.docs,
        likes: resourceLikes,
      }),
    };
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

interface IPayload {
  symptomId: string;
  userId: string;
  source: string;
  category: IResourceCategory;
  limit: number;
  currentPage: number;
}

interface IGetResourcesService {
  (props: IPayload): Promise<IResourceResponse>;
}

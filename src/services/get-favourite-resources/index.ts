import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { resourcesAdapter } from "../../utils/resourcesAdapter";
import { sliceData } from "../../utils/sliceData";

import { IResourceWithLikeResponse } from "../../entities/IResourceWithLikeResponse";
import { resourceWithLikeAdapter } from "../../utils/resourceWithLikeAdapter";
import { IOption } from "../../entities/IOption";
import { IResourceName } from "../../entities/IResourceName";
import { services } from "..";

export const getFavouriteResources: IGetFavouriteResourcesService = async (
  props
) => {
  const collectionName = `${props.name}_resources`;
  const referenceId = props?.name === "symptom" ? "symptomId" : "categoryId";

  const resourcesRef = collection(db, collectionName);

  let collectionQuery = query(resourcesRef, orderBy("createdAt"));

  if (props?.refId) {
    collectionQuery = query(
      resourcesRef,
      where(referenceId, "==", props?.refId),
      orderBy("createdAt")
    );
  }

  const totalSnapshot = await getDocs(collectionQuery);

  let resources = resourcesAdapter({
    userId: props?.userId,
    resourceDocs: totalSnapshot.docs,
  });

  if (!props?.refId && props?.type?.name !== "All") {
    resources = resources.filter(
      (resource) => resource.typeId === props?.type?.id
    );
  }

  const resourceLikes = await services.get.likes({
    userId: props?.userId,
    resources: resources,
  });

  const filteredResources = resourceLikes.filter(
    (resource) => resource.isLiked
  );

  return {
    count: filteredResources.length,
    results: sliceData({
      data: filteredResources,
      skip: props.skip,
      limit: props.limit,
    }),
  };
};

interface IProps {
  skip: number;
  limit: number;
  userId: string;
  type: IOption;
  name: IResourceName;
  refId: string;
}

interface IGetFavouriteResourcesService {
  (props: IProps): Promise<IResourceWithLikeResponse>;
}

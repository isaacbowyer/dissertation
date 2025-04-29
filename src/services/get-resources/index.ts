import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { IResourceTypeTag } from "../../entities/IResourceTypeTag";
import { db } from "../../config/firebase";
import { resourcesAdapter } from "../../utils/resourcesAdapter";
import { IOption } from "../../entities/IOption";

export const getResources: IGetResourcesService = async (props) => {
  const collectionName = `${props.name}_resources`;
  const referenceId = props?.name === "symptom" ? "symptomId" : "categoryId";

  const resourcesRef = collection(db, collectionName);

  let collectionQuery = query(
    resourcesRef,
    where(referenceId, "==", props?.refId)
  );

  if (props?.type?.name !== "All")
    collectionQuery = query(
      resourcesRef,
      where(referenceId, "==", props?.refId),
      where("typeId", "==", props?.type?.id)
    );

  const totalSnapshot = await getDocs(collectionQuery);
  const totalResources = totalSnapshot.size;

  collectionQuery = query(
    resourcesRef,
    where(referenceId, "==", props?.refId),
    orderBy("createdAt"),
    limit(props?.limit)
  );

  if (props?.type?.name !== "All") {
    collectionQuery = query(
      resourcesRef,
      where(referenceId, "==", props?.refId),
      where("typeId", "==", props?.type?.id),
      orderBy("createdAt"),
      limit(props?.limit)
    );
  }

  let resourceSnapshot = await getDocs(collectionQuery);

  if (props?.currentPage > 1) {
    const lastVisible =
      resourceSnapshot.docs[resourceSnapshot.docs?.length - 1];

    if (props?.type?.name === "All")
      collectionQuery = query(
        resourcesRef,
        where(referenceId, "==", props.refId),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    else {
      collectionQuery = query(
        resourcesRef,
        where("symptomId", "==", props?.refId),
        where("typeId", "==", props?.type?.id),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    }

    resourceSnapshot = await getDocs(collectionQuery);
  }

  return {
    count: totalResources,
    results: resourcesAdapter({
      userId: props?.userId,
      resourceDocs: resourceSnapshot.docs,
    }),
  };
};

interface IProps {
  name: "symptom" | "work";
  refId: string;
  type: IOption;
  limit: number;
  currentPage: number;
  userId: string;
}

interface IGetResourcesService {
  (props: IProps): Promise<any>;
}

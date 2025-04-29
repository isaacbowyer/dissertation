import { trackedSymptomsAdapter } from "../../utils/trackedSymptomsAdapter";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const getTrackedSymptoms: IGetTrackedSymptomsService = async (props) => {
  const collectionRef = collection(db, "tracked_symptoms");
  const sign = props?.source === "current" ? ">" : "<";

  let totalDocuments;
  let collectionQuery;
  let resourceSnapshot;

  if (props?.source !== "all") {
    collectionQuery = query(
      collectionRef,
      where("userId", "==", props?.userId),
      where("targetDate", sign, new Date())
    );

    // Get total document count
    const totalSnapshot = await getDocs(collectionQuery);
    totalDocuments = totalSnapshot.size;

    collectionQuery = query(
      collectionRef,
      where("userId", "==", props?.userId),
      where("targetDate", sign, new Date()),
      orderBy("createdAt"),
      limit(props?.limit)
    );

    resourceSnapshot = await getDocs(collectionQuery);

    if (props?.currentPage > 1) {
      const lastVisible =
        resourceSnapshot.docs[resourceSnapshot.docs?.length - 1];

      collectionQuery = query(
        collectionRef,
        where("userId", "==", props?.userId),
        where("targetDate", sign, new Date()),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );

      resourceSnapshot = await getDocs(collectionQuery);
    }
  } else {
    collectionQuery = query(
      collectionRef,
      where("userId", "==", props?.userId)
    );

    resourceSnapshot = await getDocs(collectionQuery);
    totalDocuments = resourceSnapshot.size;
  }

  return {
    count: totalDocuments,
    results: trackedSymptomsAdapter(resourceSnapshot.docs),
  };
};

interface IGetTrackedSymptomsService {
  (props: IPayload): Promise<ITrackedSymptomsResponse>;
}

interface IPayload {
  userId: string;
  limit: number;
  currentPage: number;
  source: string;
}

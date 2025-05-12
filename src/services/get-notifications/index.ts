import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { INotificationResponse } from "../../entities/INotificationResponse";
import { INotificationTag } from "../../entities/INotificationTag";
import { db } from "../../config/firebase";
import { notificationsAdapter } from "../../utils/notificationsAdapter";

export const getNotifications: IGetNotificationsService = async (props) => {
  const resourcesRef = collection(db, "notifications");
  const isReadTag = props?.source === "Read" ? true : false;

  let collectionQuery = query(
    resourcesRef,
    where("userId", "==", props?.userId)
  );

  if (props?.source !== "All")
    collectionQuery = query(
      resourcesRef,
      where("userId", "==", props?.userId),
      where("isRead", "==", isReadTag)
    );

  const totalSnapshot = await getDocs(collectionQuery);
  const totalNotifications = totalSnapshot.size;

  collectionQuery = query(
    resourcesRef,
    where("userId", "==", props?.userId),
    orderBy("createdAt", "desc"),
    limit(props?.limit)
  );

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("userId", "==", props?.userId),
      where("isRead", "==", isReadTag),
      orderBy("createdAt", "desc"),
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
        where("userId", "==", props?.userId),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    else {
      collectionQuery = query(
        resourcesRef,
        where("userId", "==", props?.userId),
        where("isRead", "==", isReadTag),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    }

    resourceSnapshot = await getDocs(collectionQuery);
  }

  return {
    count: totalNotifications,
    results: notificationsAdapter(resourceSnapshot.docs),
  };
};

interface IProps {
  userId: string;
  source: INotificationTag;
  limit: number;
  currentPage: number;
}

interface IGetNotificationsService {
  (props: IProps): Promise<INotificationResponse>;
}

import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { INotification } from "../../entities/INotification";

export const notificationsAdapter: IResourcesAdapter = (docs) => {
  const notifications: INotification[] = docs?.map((doc) => {
    const data = doc?.data();

    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      title: data?.title,
      subTitle: data?.subTitle,
      isRead: data?.isRead,
      userId: data?.userId,
      createdAt: createdAtTimestamp?.toDate(),
    };
  });

  return notifications;
};

interface IResourcesAdapter {
  (
    notificationDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
  ): INotification[];
}

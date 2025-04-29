import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export const postNotification: IPostNotificationService = async (props) => {
  await addDoc(collection(db, "notifications"), {
    userId: props?.userId,
    title: props?.title,
    subTitle: props?.subTitle,
    isRead: false,
    createdAt: new Date(),
  });
};

interface IPayload {
  userId: string;
  title: string;
  subTitle: string;
}

interface IPostNotificationService {
  (props: IPayload): Promise<any>;
}

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const updateNotification: IUpdateNotificationService = async (props) => {
  const docRef = doc(db, "notifications", props?.id);

  await updateDoc(docRef, {
    ["isRead"]: props?.isRead,
  });
};

interface IProps {
  id: string;
  isRead: boolean;
}
interface IUpdateNotificationService {
  (props: IProps): Promise<any>;
}

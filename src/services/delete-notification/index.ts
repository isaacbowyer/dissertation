import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteNotification: IDeleteNotificationService = async (props) => {
  const docRef = doc(db, "notifications", props?.id);
  await deleteDoc(docRef);
};

interface IPayload {
  id: string;
}

interface IDeleteNotificationService {
  (props: IPayload): Promise<any>;
}

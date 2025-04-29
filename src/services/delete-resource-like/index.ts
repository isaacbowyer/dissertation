import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomResourceLike: IDeleteSymptomResourceLikeService =
  async (props) => {
    const docRef = doc(db, "resource_likes", props?.id);
    await deleteDoc(docRef);
  };

interface IPayload {
  id: string;
}

interface IDeleteSymptomResourceLikeService {
  (props: IPayload): Promise<any>;
}

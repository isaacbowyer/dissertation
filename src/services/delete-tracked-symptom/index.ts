import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteTrackedSymptom: IDeleteTrackedSymptomService = async (
  id
) => {
  const docRef = doc(db, "tracked_symptoms", id);

  await deleteDoc(docRef);
};

interface IDeleteTrackedSymptomService {
  (id: string): Promise<any>;
}

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export const postSymptomScore: IPostSymptomScoreService = async (props) => {
  await addDoc(collection(db, "symptom_scores"), {
    userId: props?.userId,
    symptomId: props?.symptomId,
    createdAt: new Date(),
    rating: props?.currentSeverity,
    comment: props?.comment,
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
  currentSeverity: number;
  comment: string;
}

interface IPostSymptomScoreService {
  (props: IPayload): Promise<any>;
}

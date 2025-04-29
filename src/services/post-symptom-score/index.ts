import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IOption } from "../../entities/IOption";

export const postSymptomScore: IPostSymptomScoreService = async (props) => {
  await addDoc(collection(db, "symptom_scores"), {
    userId: props?.userId,
    symptomId: props?.symptomId,
    createdAt: new Date(),
    rating: Number(props?.currentSeverity?.name),
    comment: props?.comment,
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
  currentSeverity: IOption;
  comment: string;
}

interface IPostSymptomScoreService {
  (props: IPayload): Promise<any>;
}

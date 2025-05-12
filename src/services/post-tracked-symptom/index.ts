import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export const postTrackedSymptom: IPostSymptomService = async (props) => {
  await addDoc(collection(db, "tracked_symptoms"), {
    userId: props?.userId,
    symptomId: props?.symptomId,
    createdAt: new Date(),
    currentSeverity: props?.currentSeverity,
    targetSeverity: props?.targetSeverity,
    targetDate: props?.targetDate,
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
  currentSeverity: number;
  targetSeverity: number;
  targetDate: Date;
}

interface IPostSymptomService {
  (props: IPayload): Promise<any>;
}

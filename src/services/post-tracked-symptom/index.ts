import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IOption } from "../../entities/IOption";

export const postTrackedSymptom: IPostSymptomService = async (props) => {
  await addDoc(collection(db, "tracked_symptoms"), {
    userId: props?.userId,
    symptomId: props?.symptomId,
    createdAt: new Date(),
    currentSeverity: Number(props?.currentSeverity?.name),
    targetSeverity: Number(props?.targetSeverity?.name),
    targetDate: props?.targetDate,
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
  currentSeverity: IOption;
  targetSeverity: IOption;
  targetDate: Date;
}

interface IPostSymptomService {
  (props: IPayload): Promise<any>;
}

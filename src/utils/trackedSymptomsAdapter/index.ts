import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { Timestamp } from "firebase/firestore";

export const trackedSymptomsAdapter: ITrackedSymptomsAdapter = (docs) => {
  const symptoms = docs?.map((doc) => {
    const data = doc?.data();

    const targetTimestamp: Timestamp = data?.targetDate;
    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      userId: data?.userId,
      currentSeverity: data?.currentSeverity,
      targetSeverity: data?.targetSeverity,
      targetDate: targetTimestamp?.toDate(),
      createdAt: createdAtTimestamp?.toDate(),
    };
  });

  return symptoms;
};

interface ITrackedSymptomsAdapter {
  (
    docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
  ): ITrackedSymptom[];
}

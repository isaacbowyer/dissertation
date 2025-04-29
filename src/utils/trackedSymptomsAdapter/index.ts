import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { Timestamp } from "firebase/firestore";
import { getSeverityType } from "../getSeverityType";
import { ISymptom } from "../../entities/ISymptom";
import { findOption } from "../findOption";

export const trackedSymptomsAdapter: ITrackedSymptomsAdapter = (
  docs,
  symptomList = []
) => {
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
      severityType: getSeverityType(data?.currentSeverity),
      targetDate: targetTimestamp?.toDate(),
      createdAt: createdAtTimestamp?.toDate(),
      name: symptomList?.length
        ? findOption(symptomList, "id", data?.symptomId)?.name
        : "",
    };
  });

  return symptoms;
};

interface ITrackedSymptomsAdapter {
  (
    docs: QueryDocumentSnapshot<DocumentData, DocumentData>[],
    symptomList?: ISymptom[]
  ): ITrackedSymptom[];
}

import { ISymptom } from "../../entities/ISymptom";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";

export const formatUserSymptoms: IFormatUserSymptomsUtil = (props) => {
  const userSymptoms = props?.trackedSymptoms?.map((trackedSymptom) => {
    const symptom = props?.symptoms?.find(
      (symptom) => symptom?.id === trackedSymptom?.symptomId
    );

    const currentSeverity = trackedSymptom?.currentSeverity;

    return {
      id: trackedSymptom?.id,
      symptomId: trackedSymptom?.symptomId,
      userId: trackedSymptom?.userId,
      imageUri: symptom?.imageUri,
      name: symptom?.name,
      createdAt: trackedSymptom?.createdAt,
      targetDate: trackedSymptom?.targetDate,
      targetSeverity: trackedSymptom?.targetSeverity,
      currentSeverity: currentSeverity,
      severityType: trackedSymptom?.severityType,
    };
  });

  return userSymptoms;
};

interface IPayload {
  symptoms: ISymptom[];
  trackedSymptoms: ITrackedSymptom[];
}

interface IFormatUserSymptomsUtil {
  (props: IPayload): ITrackedSymptom[];
}

import { ISymptom } from "../../entities/ISymptom";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";

export const retrieveUnusedSymptoms: IRetrieveUnusedSymptomsUtil = (
  symptoms,
  trackedSymptoms
) => {
  if (!trackedSymptoms?.length) return symptoms;

  return symptoms?.filter((symptom) => {
    const foundSymptom = trackedSymptoms?.find(
      (trackedSymptom) => trackedSymptom?.symptomId === symptom?.id
    );

    return !foundSymptom;
  });
};

interface IRetrieveUnusedSymptomsUtil {
  (symptoms: ISymptom[], trackedSymptoms: ITrackedSymptom[]): ISymptom[];
}

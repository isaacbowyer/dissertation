import { ISymptom } from "../../entities/ISymptom";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";

export const filterUsedSymptoms: IFilterUsedSymptomsUtil = (
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

interface IFilterUsedSymptomsUtil {
  (symptoms: ISymptom[], trackedSymptoms: ITrackedSymptom[]): ISymptom[];
}

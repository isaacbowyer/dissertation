import { ISymptom } from "../../entities/ISymptom";

export const filterSymptoms: IFilterSymptomsUtil = (search, symptoms) => {
  if (!search) return symptoms;

  const lowerCaseSearch = search?.toLowerCase();

  return symptoms?.filter((symptom) =>
    symptom?.name?.toLowerCase()?.includes(lowerCaseSearch)
  );
};

interface IFilterSymptomsUtil {
  (search: string, symptoms: ISymptom[]): ISymptom[];
}

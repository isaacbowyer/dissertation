import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { formatDate } from "../formatDate";
import { ISymptom } from "../../entities/ISymptom";
import { trackedSymptomsAdapter } from "../trackedSymptomsAdapter";

export const applyFilters: IApplyFiltersUtil = ({
  docs,
  config,
  symptomList,
}) => {
  const symptoms = trackedSymptomsAdapter(docs, symptomList);

  return symptoms.filter((symptom) =>
    config.every((item) => {
      if (item.name === "targetDate") {
        return formatDate(symptom.targetDate) === formatDate(item.value);
      }
      if (item.name === "name") {
        const searchValue = item.value.toLowerCase();
        return symptom.name.toLowerCase().includes(searchValue);
      }
      return item.value === symptom[item.name];
    })
  );
};

interface IProps {
  docs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  config: any[];
  symptomList: ISymptom[];
}
interface IApplyFiltersUtil {
  (props: IProps): ITrackedSymptom[];
}

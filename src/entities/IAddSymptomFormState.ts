import { IOption } from "./IOption";
import { ISymptom } from "./ISymptom";

export interface IAddSymptomFormState {
  selectedSymptom: ISymptom;
  currentSeverity: IOption;
  targetSeverity: IOption;
  targetDate: Date;
  search: string;
  isLoading: boolean;
}

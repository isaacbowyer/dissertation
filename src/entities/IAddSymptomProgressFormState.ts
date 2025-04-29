import { IOption } from "./IOption";

export interface IAddSymptomProgressFormState {
  comment: string;
  currentSeverity: IOption;
  isLoading: boolean;
}

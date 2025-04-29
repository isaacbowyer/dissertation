import { IOption } from "./IOption";

export interface IAdvancedSearch {
  symptom: string;
  currentRating: IOption;
  targetRating: IOption;
  targetDate: Date;
  severityType: IOption;
}

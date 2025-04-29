import { ISeverityType } from "./ISeverityType";
import { ITrackedSymptom } from "./ITrackedSymptom";

export interface IUserSymptom extends ITrackedSymptom {
  imageUri: string;
  name: string;
  severityType: ISeverityType;
}

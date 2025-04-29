import { ISeverityType } from "./ISeverityType";

export interface ITrackedSymptom {
  id: string;
  symptomId: string;
  userId: string;
  targetDate: Date;
  createdAt: Date;
  targetSeverity: number;
  currentSeverity: number;
  severityType: ISeverityType;
  name?: string;
}

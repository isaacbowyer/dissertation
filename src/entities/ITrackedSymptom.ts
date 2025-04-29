export interface ITrackedSymptom {
  id: string;
  symptomId: string;
  userId: string;
  targetDate: Date;
  createdAt: Date;
  targetSeverity: number;
  currentSeverity: number;
}

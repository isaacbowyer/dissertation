import { IChartType } from "./IChartType";
import { IOption } from "./IOption";
import { IResourceTypeTag } from "./IResourceTypeTag";

export interface ISymptomGoalState {
  targetSeverity: IOption;
  targetDate: Date;
  currentPage: number;
  isLoading: boolean;
  source: IResourceTypeTag;
  chartType: IChartType;
}

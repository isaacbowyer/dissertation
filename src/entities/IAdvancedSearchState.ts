import { IAdvancedSearch } from "./IAdvancedSearch";
import { IOption } from "./IOption";

export interface IAdvancedSearchState extends IAdvancedSearch {
  ratingList: IOption[];
  severityList: IOption[];
  source: string;
}

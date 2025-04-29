import { severityTypes } from "../../data/severityTypes";
import { IOption } from "../../entities/IOption";
import { createDropdownOptions } from "../../utils/createDropdownOptions";

export const useSeverityTypes = () => {
  const severityTypeOptions: IOption[] = createDropdownOptions(severityTypes);

  return severityTypeOptions;
};

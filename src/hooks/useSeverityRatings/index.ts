import { IOption } from "../../entities/IOption";
import { createDropdownOptions } from "../../utils/createDropdownOptions";

export const useSeverityRatings = () => {
  const severityOptions: IOption[] = createDropdownOptions([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);

  const formattedSeverityOptions: IOption[] = createDropdownOptions([
    "0 (Best)",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10 (Worst)",
  ]);

  return {
    severityOptions,
    formattedSeverityOptions,
  };
};

import { IOption } from "../../entities/IOption";
import { adjustSeverityValue } from "../adjustSeverityValue";

export const createSeverityList: ICreateSeverityListUtil = ({
  severityList,
  type,
  selectedSeverity,
}) => {
  const severity = Number(selectedSeverity.name);

  if (!severity) return severityList;

  return severityList.filter((item) => {
    const adjustedValue = adjustSeverityValue(item);

    if (type === "current") {
      return Number(adjustedValue.name) > severity;
    }

    return Number(adjustedValue.name) < severity;
  });
};

interface IProps {
  severityList: IOption[];
  selectedSeverity: IOption;
  type: "current" | "target";
}

interface ICreateSeverityListUtil {
  (props: IProps): IOption[];
}

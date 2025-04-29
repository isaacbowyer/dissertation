import { IOption } from "../../entities/IOption";

export const createSeverityList: ICreateSeverityListUtil = (
  severityList,
  selectedSeverity
) => {
  return severityList?.filter(
    (severity) => severity.id !== selectedSeverity.id
  );
};

interface ICreateSeverityListUtil {
  (severityList: IOption[], selectedSeverity: IOption): IOption[];
}

import { ISeverityType } from "../../entities/ISeverityType";

export const getSeverityType: IGetSeverityTypeUtil = (severity) => {
  if (severity >= 9) {
    return "Critical";
  } else if (severity >= 7) {
    return "Severe";
  } else if (severity >= 4) {
    return "Mild";
  } else if (severity >= 2) {
    return "Stable";
  } else {
    return "Healthy";
  }
};

interface IGetSeverityTypeUtil {
  (severity: number): ISeverityType;
}

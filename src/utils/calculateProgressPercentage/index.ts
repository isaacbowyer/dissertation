export const calculateProgressPercentage: ICalculateProgresPercentageIUtil = ({
  severityRange,
  currentSeverity,
  targetSeverity,
}) => {
  if (currentSeverity >= targetSeverity) {
    return (
      ((severityRange - currentSeverity) / (severityRange - targetSeverity)) *
      100
    );
  } else {
    return ((currentSeverity - targetSeverity) / targetSeverity) * 100;
  }
};

interface IPayload {
  severityRange: number;
  currentSeverity: number;
  targetSeverity: number;
}
interface ICalculateProgresPercentageIUtil {
  (props: IPayload): number;
}

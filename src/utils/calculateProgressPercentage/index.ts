export const calculateProgressPercentage: ICalculateProgresPercentageIUtil = ({
  currentSeverity,
  targetSeverity,
}) => {
  if (currentSeverity <= targetSeverity) return 100;

  const remainingRange = currentSeverity - targetSeverity; // Remaining range to target severity
  return Math.max(0, 100 - (remainingRange / 10) * 100); // Calculate progress percentage
};

interface IPayload {
  currentSeverity: number;
  targetSeverity: number;
}
interface ICalculateProgresPercentageIUtil {
  (props: IPayload): number;
}

import { displayFullDate } from "../displayFullDate";
import { getDaysLeft } from "../getDaysLeft";

export const displaySymptomProgressMessage: IDisplaySymptomProgressMessageUtil =
  ({ targetDate, currentSeverity, targetSeverity }) => {
    const date = displayFullDate(targetDate);

    if (new Date() > targetDate) {
      if (currentSeverity <= targetSeverity) {
        return "The Target Date has passed and you have met your Target Severity";
      }

      return `You have failed to met your Target Severity, which was scheduled for the ${date}`;
    }

    const daysLeft = getDaysLeft(targetDate);

    if (currentSeverity <= targetSeverity) {
      return `You have met your Target Severity, with ${daysLeft} days remaining.`;
    }

    const severityDifference = targetSeverity - currentSeverity;

    // Calculate the severity improvement rate per day
    const severityImprovementPerDay = severityDifference / Math.abs(daysLeft);

    // Calculate the estimated severity on the target date
    const estimatedSeverityOnTargetDate =
      currentSeverity + severityImprovementPerDay * Math.abs(daysLeft);

    // Determine if the user is On-Track or Off-Track
    if (estimatedSeverityOnTargetDate <= targetSeverity) {
      return `You are On-Target of completing your Target Severity rating, which is scheduled for the ${date}`;
    } else {
      return `You are Off-Target of completing your Target Severity rating, which is scheduled for the ${date}`;
    }
  };

interface IProps {
  targetDate: Date;
  currentSeverity: number;
  targetSeverity: number;
}

interface IDisplaySymptomProgressMessageUtil {
  (props: IProps): string;
}

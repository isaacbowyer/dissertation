import { format, startOfWeek } from "date-fns";
import { IScore } from "../../entities/IScore";
import { ISymptomScore } from "../../entities/ISymptomScore";
import { IChartType } from "../../entities/IChartType";
import { sliceData } from "../sliceData";

export const calculateAverageScores: ICalculateAverageScoresUtil = ({
  data,
  interval,
  limit,
}) => {
  const averageScores = {};

  // Determine the date field to use for grouping (createdAt or updatedAt, depending on your data structure)
  const dateField = "createdAt";

  // Calculate total score and count for each time interval
  data.forEach((entry) => {
    const date = new Date(entry[dateField]);

    let intervalKey;
    if (interval === "Week") {
      // Group by week
      const weekStart = startOfWeek(date);
      intervalKey = `${format(weekStart, "MMM dd")}`;
    } else {
      intervalKey = format(date, "MMMM"); // Get full month name
    }

    if (!averageScores[intervalKey]) {
      averageScores[intervalKey] = { totalScore: 0, count: 0 };
    }

    averageScores[intervalKey].totalScore += entry.rating;
    averageScores[intervalKey].count++;
  });

  // Calculate the average for each time interval and store in an array of objects
  const result = [];
  Object.keys(averageScores).forEach((intervalKey) => {
    const average =
      averageScores[intervalKey].totalScore / averageScores[intervalKey].count;
    result.push({
      interval: intervalKey,
      averageScore: Number(average.toFixed(2)),
    });
  });

  return sliceData({ data: result, skip: 0, limit: limit });
};

interface IProps {
  data: ISymptomScore[];
  interval: IChartType;
  limit: number;
}
interface ICalculateAverageScoresUtil {
  (props: IProps): IScore[];
}

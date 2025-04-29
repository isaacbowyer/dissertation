import { IScore } from "../../entities/IScore";
import { ISymptomScore } from "../../entities/ISymptomScore";

export const calculateAverageScores: ICalculateAverageScoresUtil = (data) => {
  const averageScores = {};

  // Calculate total score and count for each month
  data.forEach((entry) => {
    const date = new Date(entry.createdAt);
    const month = date.toLocaleString("default", { month: "long" }); // Get full month name

    if (!averageScores[month]) {
      averageScores[month] = { totalScore: 0, count: 0 };
    }

    averageScores[month].totalScore += entry.rating;
    averageScores[month].count++;
  });

  // Calculate the average for each month and store in an array of objects
  const result = [];
  Object.keys(averageScores).forEach((month) => {
    const average =
      averageScores[month].totalScore / averageScores[month].count;
    result.push({ month, averageScore: Number(average.toFixed(2)) });
  });

  return result;
};
interface ICalculateAverageScoresUtil {
  (scores: ISymptomScore[]): IScore[];
}

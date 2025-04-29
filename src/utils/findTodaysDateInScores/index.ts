import { ISymptomScore } from "../../entities/ISymptomScore";
import { formatDate } from "../formatDate";

export const findTodaysDateInScores: IFindTodaysDateInScoresUtil = (scores) => {
  const todayDate = new Date(); // date

  const foundScore = scores?.find(
    (score) => formatDate(score.createdAt) === formatDate(todayDate)
  );

  return !!foundScore;
};

interface IFindTodaysDateInScoresUtil {
  (scores: ISymptomScore[]): boolean;
}

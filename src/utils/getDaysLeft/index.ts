import { differenceInDays } from "date-fns";

export const getDaysLeft: IGetDaysLeftUtil = (targetDate) => {
  const todayDate = new Date();
  return differenceInDays(targetDate, todayDate);
};

interface IGetDaysLeftUtil {
  (targetDate: Date): number;
}

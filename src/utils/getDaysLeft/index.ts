import { differenceInDays } from "date-fns";

export const getDaysLeft: IGetDaysLeftUtil = (targetDate) => {
  const todayDate = new Date();

  const difference = differenceInDays(targetDate, todayDate);

  if (difference <= 0) return 0;

  return difference;
};

interface IGetDaysLeftUtil {
  (targetDate: Date): number;
}

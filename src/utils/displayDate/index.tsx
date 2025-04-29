import { format } from "date-fns";

export const displayDate: IDisplayDateUtil = (date = new Date()) => {
  return format(date, "do MMMM yyyy");
};

interface IDisplayDateUtil {
  (date?: Date): string;
}

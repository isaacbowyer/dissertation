import { format } from "date-fns";

export const displayFullDate: IDisplayFullDateUtil = (date = new Date()) => {
  return format(date, "do MMMM yyyy");
};

interface IDisplayFullDateUtil {
  (date?: Date): string;
}

import { format } from "date-fns";

export const formatDate: IFormatDateUtil = (date = new Date()) => {
  return format(date, "dd/MM/yyy");
};

interface IFormatDateUtil {
  (date?: Date): string;
}

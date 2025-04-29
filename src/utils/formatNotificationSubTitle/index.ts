import { formatDate } from "../formatDate";

export const formatNotificationSubTitle = (subTitle: string, date: Date) => {
  const formattedDate = formatDate(date);
  return `${subTitle} - ${formattedDate}`;
};

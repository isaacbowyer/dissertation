import { IOption } from "../../entities/IOption";

export const getOptionNameFromId: IGetOptionNameFromIdUtil = (items, id) => {
  if (!items?.length) return "";

  const item = items.find((item) => item?.id == id);

  if (!item) return "";

  return item.name;
};

interface IGetOptionNameFromIdUtil {
  (items: IOption[], id: string): string;
}

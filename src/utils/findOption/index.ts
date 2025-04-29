import { INITAL_OPTION } from "../../data/defaultValues";
import { IOption } from "../../entities/IOption";

export const findOption: IFindOptionUtil = (items, key, value) => {
  if (!value) return INITAL_OPTION;

  return items?.find((item) => {
    return item[key] == value;
  });
};

interface IFindOptionUtil {
  (items: IOption[], key: keyof IOption, value: string): IOption;
}

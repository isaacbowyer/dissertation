import { IOption } from "../../entities/IOption";

export const findOption: IFindOptionUtil = (items, key, value) => {
  return items?.find((item) => item[key] === value);
};

interface IFindOptionUtil {
  (items: IOption[], key: keyof IOption, value: string): IOption;
}

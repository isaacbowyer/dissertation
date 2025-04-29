import { IOption } from "../../entities/IOption";

export const createDropdownOptions: ICreateDropdownOptions = (list) => {
  return list.map((item, index) => {
    return {
      id: index + 1,
      name: item,
    };
  });
};

interface ICreateDropdownOptions {
  (list: string[]): IOption[];
}

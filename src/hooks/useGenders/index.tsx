import { genderList } from "../../data/genders";
import { IOption } from "../../entities/IOption";
import { createDropdownOptions } from "../../utils/createDropdownOptions";

export const useGenders = () => {
  const genderOptions: IOption[] = createDropdownOptions(genderList);

  return genderOptions;
};

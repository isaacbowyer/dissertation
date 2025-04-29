import { industryList } from "../../data/industries";
import { IOption } from "../../entities/IOption";
import { createDropdownOptions } from "../../utils/createDropdownOptions";

export const useIndustries = () => {
  const genderOptions: IOption[] = createDropdownOptions(industryList);

  return genderOptions;
};

import { countryList } from "../../data/countries";
import { IOption } from "../../entities/IOption";
import { createDropdownOptions } from "../../utils/createDropdownOptions";

export const useCountries = () => {
  const genderOptions: IOption[] = createDropdownOptions(countryList);

  return genderOptions;
};

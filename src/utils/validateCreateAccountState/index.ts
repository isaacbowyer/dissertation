import { IOption } from "../../entities/IOption";
import { IPersonalAccountStateValidationError } from "../../entities/IPersonalAccountStateValidationError";

export const validateCreateAccountState: IValidateCreateAccountStateUtil = ({
  validationError,
  industry,
  gender,
  country,
  dateOfBirth,
}) => {
  return (
    Object.values(validationError).some((field) => field !== "") ||
    !industry.id ||
    !gender.id ||
    !country.id ||
    !dateOfBirth
  );
};

interface IProps {
  validationError: IPersonalAccountStateValidationError;
  industry: IOption;
  gender: IOption;
  country: IOption;
  dateOfBirth: Date;
}

interface IValidateCreateAccountStateUtil {
  (props: IProps): boolean;
}

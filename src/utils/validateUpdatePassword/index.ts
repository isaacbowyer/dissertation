import { validatePassword } from "../validatePassword";

export const validateUpdatePassword: IValidateUpdatePasswordUtil = (
  password
) => {
  if (!password) return true;

  return validatePassword(password);
};

interface IValidateUpdatePasswordUtil {
  (password: string): boolean;
}

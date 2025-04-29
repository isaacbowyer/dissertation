export const validateEmail: IValidateEmailUtil = (email) => {
  const lowerCaseEmail = String(email).toLowerCase();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(lowerCaseEmail);
};

interface IValidateEmailUtil {
  (email: string): boolean;
}

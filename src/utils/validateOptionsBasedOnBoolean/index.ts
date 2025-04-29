export const validateOptionsBasedOnBoolean = <Type>(
  isEnabled: boolean,
  option1: Type,
  option2: Type
) => {
  return isEnabled ? option1 : option2;
};

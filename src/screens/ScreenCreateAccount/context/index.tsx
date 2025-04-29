import { createContext, useContext, useState } from "react";
import { useCountries } from "../../../hooks/useCountries";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useGenders } from "../../../hooks/useGenders";
import { useIndustries } from "../../../hooks/useIndustries";
import { ICreateAccountState } from "../../../entities/ICreateAccountState";
import { validateText } from "../../../utils/validateText";
import { VALIDATION_ERRORS } from "../../../data/errors";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePassword } from "../../../utils/validatePassword";
import { compareValues } from "../../../utils/compareValues";
import { ICreateAccountValidationError } from "../../../entities/ICreateAccountValidationError";
import { validateCreateAccountState } from "../../../utils/validateCreateAccountState";
import { IOption } from "../../../entities/IOption";
import { ICreateAccountStateKey } from "../../../entities/ICreateAccountStateKey";
import { ICreateAccountStateKeyValue } from "../../../entities/ICreateAccountStateKeyValue";
import { IProviderProps } from "../../../entities/IProviderProps";
import { services } from "../../../services";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { INITAL_OPTION } from "../../../data/defaultValues";

const INITAL_STATE: ICreateAccountState = {
  isLoading: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  country: INITAL_OPTION,
  industry: INITAL_OPTION,
  gender: INITAL_OPTION,
  birthDate: null,
};

const CreateAccountContext = createContext({} as ICreateAccountContext);

export const CreateAccountProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const industries = useIndustries();
  const countries = useCountries();
  const genders = useGenders();
  const toast = useCustomToast();

  const [formState, setFormState] = useState<ICreateAccountState>(INITAL_STATE);

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setFormState((prev) => ({ ...prev, isLoading: boolean }));
  };

  const _handleResetState = () => {
    setFormState(INITAL_STATE);
  };

  // ACTION METHODS
  const handleOnChange = (
    key: ICreateAccountStateKey,
    value: ICreateAccountStateKeyValue
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      _handleSetLoading(true);

      const user = await services.post.authRegistration({
        email: formState?.email,
        password: formState?.password,
        firstName: formState?.firstName,
        lastName: formState?.lastName,
        companyName: formState?.companyName,
        dateOfBirth: formState?.birthDate,
        gender: formState?.gender,
        industry: formState?.industry,
        country: formState?.country,
      });

      toast.successToast("Account created. You can now Log In");
      navigation.navigate("Log In");
      _handleResetState();
    } catch (e: any) {
      toast.errorToast("Unable to create account. Try again later");
    } finally {
      _handleSetLoading(false);
    }
  };

  const validationError: ICreateAccountValidationError = {
    firstName: validateText(formState.firstName) ? "" : VALIDATION_ERRORS.NAME,
    lastName: validateText(formState.lastName) ? "" : VALIDATION_ERRORS.NAME,
    email: validateEmail(formState.email) ? "" : VALIDATION_ERRORS.EMAIL,
    password: validatePassword(formState.password)
      ? ""
      : VALIDATION_ERRORS.PASSWORD,
    confirmPassword: compareValues(
      formState.password,
      formState.confirmPassword
    )
      ? ""
      : VALIDATION_ERRORS.PASSWORD_CONFIRM,
    companyName: validateText(formState.companyName)
      ? ""
      : VALIDATION_ERRORS.NAME,
  };

  const isDisabled = validateCreateAccountState({
    validationError: validationError,
    industry: formState.industry,
    country: formState.country,
    gender: formState.gender,
    dateOfBirth: formState.birthDate,
  });

  return (
    <CreateAccountContext.Provider
      value={{
        state: {
          isDisabled: isDisabled,
          validationError: validationError,
          industryOptions: industries,
          countryOptions: countries,
          genderOptions: genders,
          values: formState,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleSubmit: handleSubmit,
        },
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};

export const useCreateAccountContext = () => {
  return useContext(CreateAccountContext);
};

interface ICreateAccountContext {
  state: {
    isDisabled: boolean;
    validationError: ICreateAccountValidationError;
    industryOptions: IOption[];
    countryOptions: IOption[];
    genderOptions: IOption[];
    values: ICreateAccountState;
  };
  methods: {
    handleOnChange: (
      key: ICreateAccountStateKey,
      value: ICreateAccountStateKeyValue
    ) => void;
    handleSubmit: () => void;
  };
}

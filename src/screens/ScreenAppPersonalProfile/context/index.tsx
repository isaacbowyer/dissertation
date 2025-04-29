import { createContext, useContext, useEffect, useState } from "react";
import { useCountries } from "../../../hooks/useCountries";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useGenders } from "../../../hooks/useGenders";
import { useIndustries } from "../../../hooks/useIndustries";
import { validateText } from "../../../utils/validateText";
import { VALIDATION_ERRORS } from "../../../data/errors";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePassword } from "../../../utils/validatePassword";
import { compareValues } from "../../../utils/compareValues";
import { validateCreateAccountState } from "../../../utils/validateCreateAccountState";
import { IOption } from "../../../entities/IOption";
import { IProviderProps } from "../../../entities/IProviderProps";
import { services } from "../../../services";
import { IPersonalAccountState } from "../../../entities/IPersonalAccountState";
import { IPersonalAccountStateKey } from "../../../entities/IPersonalAccountStateKey";
import { IPersonalAccountStateKeyValue } from "../../../entities/IPersonalAccountStateKeyValue";
import { IPersonalAccountStateValidationError } from "../../../entities/IPersonalAccountStateValidationError";
import { auth } from "../../../config/firebase";
import { INITAL_OPTION } from "../../../data/defaultValues";
import { findOption } from "../../../utils/findOption";
import { validateUpdatePassword } from "../../../utils/validateUpdatePassword";

const INITIAL_DATA: IPersonalAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  country: INITAL_OPTION,
  industry: INITAL_OPTION,
  gender: INITAL_OPTION,
  birthDate: new Date(),
  id: "",
};

const PersonalProfileContext = createContext({} as IPersonalProfileContext);

export const PersonalProfileProvider = ({ children }: IProviderProps) => {
  const industries = useIndustries();
  const countries = useCountries();
  const genders = useGenders();
  const toast = useCustomToast();
  const [formState, setFormState] =
    useState<IPersonalAccountState>(INITIAL_DATA);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setIsLoading(boolean);
  };

  const _handleSetFetching = (boolean: boolean) => {
    setIsFetching(boolean);
  };

  useEffect(() => {
    (async () => {
      _handleSetFetching(true);

      try {
        const user = await services.get.user({
          userId: auth.currentUser.uid,
        });

        setFormState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: auth.currentUser.email,
          password: "",
          confirmPassword: "",
          companyName: user.companyName,
          country: findOption(countries, "name", user.country),
          industry: findOption(industries, "name", user.industry),
          gender: findOption(genders, "name", user.gender),
          birthDate: user.birthDate,
          id: user.id,
        });

        console.log("SUCCESS", "Loaded your personal details successfully");
      } catch (error: any) {
        toast.errorToast(
          "Failed to load your personal details. Try again later"
        );
      } finally {
        _handleSetFetching(false);
      }
    })();
  }, [auth.currentUser.uid]);

  // ACTION METHODS
  const handleOnChange = (
    key: IPersonalAccountStateKey,
    value: IPersonalAccountStateKeyValue
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      _handleSetLoading(true);

      await services.composition.user({
        id: formState?.id,
        firstName: formState?.firstName,
        lastName: formState?.lastName,
        email: formState?.email,
        password: formState?.password,
        confirmPassword: formState?.confirmPassword,
        companyName: formState?.companyName,
        industry: formState?.industry,
        country: formState?.country,
        gender: formState?.gender,
        birthDate: formState?.birthDate,
      });

      await services.post.notification({
        userId: auth?.currentUser?.uid,
        title: "Updated Personal Profile",
        subTitle: `You updated your personal details`,
      });

      toast.successToast("Successfully edited your personal details");
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast("Unable to edit account details. Try again later");
    } finally {
      _handleSetLoading(false);
    }
  };

  const validationError: IPersonalAccountStateValidationError = {
    firstName: validateText(formState.firstName) ? "" : VALIDATION_ERRORS.NAME,
    lastName: validateText(formState.lastName) ? "" : VALIDATION_ERRORS.NAME,
    email: validateEmail(formState.email) ? "" : VALIDATION_ERRORS.EMAIL,
    password: validateUpdatePassword(formState.password)
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
    <PersonalProfileContext.Provider
      value={{
        state: {
          isLoading: isLoading,
          isFetching: isFetching,
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
    </PersonalProfileContext.Provider>
  );
};

export const usePersonalProfile = () => {
  return useContext(PersonalProfileContext);
};

interface IPersonalProfileContext {
  state: {
    isDisabled: boolean;
    isFetching: boolean;
    isLoading: boolean;
    validationError: IPersonalAccountStateValidationError;
    industryOptions: IOption[];
    countryOptions: IOption[];
    genderOptions: IOption[];
    values: IPersonalAccountState;
  };
  methods: {
    handleOnChange: (
      key: IPersonalAccountStateKey,
      value: IPersonalAccountStateKeyValue
    ) => void;
    handleSubmit: () => void;
  };
}

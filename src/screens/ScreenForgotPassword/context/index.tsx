import { createContext, useContext, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { VALIDATION_ERRORS } from "../../../data/errors";
import { validateEmail } from "../../../utils/validateEmail";
import { IProviderProps } from "../../../entities/IProviderProps";
import { services } from "../../../services";
import { IPersonalAccountStateKey } from "../../../entities/IPersonalAccountStateKey";
import { IPersonalAccountStateKeyValue } from "../../../entities/IPersonalAccountStateKeyValue";

const ForgotPasswordContext = createContext({} as IForgotPasswordContext);

export const ForgotPasswordProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setIsLoading(boolean);
  };

  const _handleResetState = () => {
    setIsLoading(false);
    setEmail("");
  };

  // ACTION METHODS
  const handleOnChange = (value: string) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    try {
      _handleSetLoading(true);

      await services.post.authForgotPassword(email);

      toast.successToast("Check your emails to reset your password");
      _handleResetState();
    } catch (e: any) {
      toast.errorToast("Unable to send Password Reset Link");
    } finally {
      _handleSetLoading(false);
    }
  };

  const emailValidationError = validateEmail(email)
    ? ""
    : VALIDATION_ERRORS.EMAIL;

  const isDisabled = emailValidationError !== "";

  return (
    <ForgotPasswordContext.Provider
      value={{
        state: {
          isDisabled: isDisabled,
          isLoading: isLoading,
          validationError: emailValidationError,
          email: email,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleSubmit: handleSubmit,
        },
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordContext = () => {
  return useContext(ForgotPasswordContext);
};

interface IForgotPasswordContext {
  state: {
    isDisabled: boolean;
    isLoading: boolean;
    validationError: string;
    email: string;
  };
  methods: {
    handleOnChange: (value: string) => void;
    handleSubmit: () => void;
  };
}

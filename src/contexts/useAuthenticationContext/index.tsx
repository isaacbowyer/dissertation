import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { ILoginData } from "../../entities/ILoginData";
import { services } from "../../services";
import { validateEmail } from "../../utils/validateEmail";
import { VALIDATION_ERRORS } from "../../data/errors";
import { validatePassword } from "../../utils/validatePassword";
import { useCustomToast } from "../../hooks/useCustomToast";

const AuthenticationContext = createContext({} as IAuthenticationContext);

// REMOVE THIS
const INITAL_STATE: IAuthenticationContextFormState = {
  email: "",
  password: "",
  isLoading: false,
};

export const AuthenticationProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();

  const [formState, setFormState] =
    useState<IAuthenticationContextFormState>(INITAL_STATE);
  const [user, setUser] = useState(null);

  // STATE METHODS
  const _handleSetLoading = (loadingState: boolean) => {
    setFormState((state) => ({ ...state, isLoading: loadingState }));
  };

  const handleSetLoginData = (data: ILoginData) => {
    setFormState((state) => ({
      ...state,
      email: data.email,
      password: data.password,
    }));
  };

  // ACTION METHODS
  const handleLogin = async () => {
    try {
      _handleSetLoading(true);

      const data = await services.post.authLogin({
        email: formState.email,
        password: formState.password,
      });

      handleSetLoginData({ email: "", password: "" });
      setUser(data);
    } catch (e: any) {
      toast.errorToast(
        "Unable to login. Please ensure your credentials are correct"
      );
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      _handleSetLoading(true);

      await services.post.authLogout();

      // RESET STATE
      handleSetLoginData({ email: "", password: "" });
      setUser(null);
      toast.successToast("Successfuly logged out of the application");
    } catch (error: any) {
      toast.errorToast("Unable to logout. Try again later");
    } finally {
      _handleSetLoading(false);
    }
  };

  const emailError = validateEmail(formState.email)
    ? ""
    : VALIDATION_ERRORS.EMAIL;
  const passwordError = validatePassword(formState.password)
    ? ""
    : VALIDATION_ERRORS.PASSWORD;

  const isDisabled = !!emailError || !!passwordError;

  return (
    <AuthenticationContext.Provider
      value={{
        state: {
          email: formState.email,
          password: formState.password,
          isLoading: formState.isLoading,
          isDisabled: isDisabled,
          emailError: emailError,
          passwordError: passwordError,
          isAuthenticated: !!user,
        },
        methods: {
          handleLogin: handleLogin,
          handleLogout: handleLogout,
          handleSetLoginData: handleSetLoginData,
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

interface IAuthenticationContext {
  state: {
    email: string;
    password: string;
    isLoading: boolean;
    isDisabled: boolean;
    emailError: string;
    passwordError: string;
    isAuthenticated: boolean;
  };
  methods: {
    handleLogin: () => Promise<void>;
    handleLogout: () => Promise<void>;
    handleSetLoginData: (data: ILoginData) => void;
  };
}

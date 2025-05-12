import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { ILoginData } from "../../entities/ILoginData";
import { services } from "../../services";
import { validateEmail } from "../../utils/validateEmail";
import { VALIDATION_ERRORS } from "../../data/errors";
import { validatePassword } from "../../utils/validatePassword";
import { useCustomToast } from "../../hooks/useCustomToast";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase/base";
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";
import { sendEmail } from "../../utils/sendEmail";

const AuthenticationContext = createContext({} as IAuthenticationContext);

WebBrowser.maybeCompleteAuthSession();

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

      if (!data.user.emailVerified) {
        toast.errorToast("Unable to login. Please verify your email.");

        return;
      }

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

  const handleDeleteAccount = async () => {
    try {
      _handleSetLoading(true);

      const user = await services.get.user({
        userId: auth.currentUser.uid,
      });

      sendEmail({ firstName: user.firstName, email: auth.currentUser.email });

      await services.delete.account();

      // RESET STATE
      handleSetLoginData({ email: "", password: "" });
      setUser(null);
      toast.successToast("Successfuly deleted your account");
    } catch (error: any) {
      toast.errorToast("Unable to delete your account. Try again later");
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
          handleDeleteAccount: handleDeleteAccount,
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
    handleDeleteAccount: () => void;
  };
}

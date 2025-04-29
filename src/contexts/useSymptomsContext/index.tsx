import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { useAuthenticationContext } from "../useAuthenticationContext";

const SymptomsContext = createContext({} as any);

export const SymptomsProvider = ({ children }: IProviderProps) => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/symptoms"],
    async () => {
      const data = await services.get.symptoms();
      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load symptoms");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded symptoms successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  return (
    <SymptomsContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
      }}
    >
      {children}
    </SymptomsContext.Provider>
  );
};

export const useSymptomsContext = () => {
  return useContext(SymptomsContext);
};

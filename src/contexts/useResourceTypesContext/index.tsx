import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { useAuthenticationContext } from "../useAuthenticationContext";

const ResourceTypesContext = createContext({} as any);

export const ResourceTypesProvider = ({ children }: IProviderProps) => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/types"],
    async () => {
      const data = await services.get.types();
      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load resource types");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded resource types successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ResourceTypesContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
      }}
    >
      {children}
    </ResourceTypesContext.Provider>
  );
};

export const useResourceTypesContext = () => {
  return useContext(ResourceTypesContext);
};

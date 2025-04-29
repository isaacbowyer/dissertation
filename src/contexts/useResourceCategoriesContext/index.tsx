import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { useAuthenticationContext } from "../useAuthenticationContext";

const ResourceCategoriesContext = createContext({} as any);

export const ResourceCategoriesProvider = ({ children }: IProviderProps) => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/categories"],
    async () => {
      const data = await services.get.categories();
      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load work resource categories");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded work resource categories successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ResourceCategoriesContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
      }}
    >
      {children}
    </ResourceCategoriesContext.Provider>
  );
};

export const useResourceCategoriesContext = () => {
  return useContext(ResourceCategoriesContext);
};

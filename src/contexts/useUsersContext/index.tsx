import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { useAuthenticationContext } from "../useAuthenticationContext";
import { IUsersResponse } from "../../entities/IUsersResponse";

const UsersContext = createContext({} as any);

const INITIAL_DATA: IUsersResponse = {
  count: 0,
  results: [],
};

export const UsersProvider = ({ children }: IProviderProps) => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/users"],
    async () => {
      const data = await services.get.users();
      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load user details");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded users successfully");
      },
      initialData: INITIAL_DATA,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <UsersContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UsersContext);
};

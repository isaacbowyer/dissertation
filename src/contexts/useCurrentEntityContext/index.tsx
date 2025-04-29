import { createContext, useContext, useState } from "react";
import { IUserSymptom } from "../../entities/IUserSymptom";
import { IWorkResource } from "../../entities/IWorkResource";

interface ICurrentSymptomContext {
  currentSymptom: IUserSymptom;
  currentWorkResource: IWorkResource;
  setCurrentWorkResource: (resource: IWorkResource) => void;
  setCurrentSymptom: (data: IUserSymptom) => void;
}

interface ICurrentEntityContext extends ICurrentSymptomContext {}

const CurrentEntityContext = createContext({} as ICurrentEntityContext);

export const CurrentEntityProvider = ({ children }) => {
  const [currentSymptom, setCurrentSymptom] = useState<IUserSymptom>(null);
  const [currentWorkResource, setCurrentWorkResource] =
    useState<IWorkResource>(null);

  return (
    <CurrentEntityContext.Provider
      value={{
        currentSymptom,
        currentWorkResource,
        setCurrentSymptom,
        setCurrentWorkResource,
      }}
    >
      {children}
    </CurrentEntityContext.Provider>
  );
};

export const useCurrentEntityContext = () => {
  return useContext(CurrentEntityContext);
};

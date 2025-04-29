import { createContext, useContext, useState } from "react";
import { IWorkResource } from "../../entities/IWorkResource";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";

interface ICurrentSymptomContext {
  currentSymptom: ITrackedSymptom;
  currentWorkResource: IWorkResource;
  currentSymptomPage: number;
  setCurrentWorkResource: (resource: IWorkResource) => void;
  setCurrentSymptom: (data: ITrackedSymptom) => void;
  setCurrentSymptomPage: (page: number) => void;
}

interface ICurrentEntityContext extends ICurrentSymptomContext {}

const CurrentEntityContext = createContext({} as ICurrentEntityContext);

export const CurrentEntityProvider = ({ children }) => {
  const [currentSymptom, setCurrentSymptom] = useState<ITrackedSymptom>(null);
  const [currentWorkResource, setCurrentWorkResource] =
    useState<IWorkResource>(null);
  const [currentSymptomPage, setCurrentSymptomPage] = useState<number>(0);

  return (
    <CurrentEntityContext.Provider
      value={{
        currentSymptom,
        currentWorkResource,
        currentSymptomPage,
        setCurrentSymptom,
        setCurrentWorkResource,
        setCurrentSymptomPage,
      }}
    >
      {children}
    </CurrentEntityContext.Provider>
  );
};

export const useCurrentEntityContext = () => {
  return useContext(CurrentEntityContext);
};

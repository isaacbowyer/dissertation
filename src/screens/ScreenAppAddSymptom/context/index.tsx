import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { ISymptom } from "../../../entities/ISymptom";
import { INITAL_OPTION, INITAL_SYMPTOM } from "../../../data/defaultValues";
import { IAddSymptomFormState } from "../../../entities/IAddSymptomFormState";
import { IOption } from "../../../entities/IOption";
import { filterSymptoms } from "../../../utils/filterSymptoms";
import { useSeverityRatings } from "../../../hooks/useSeverityRatings";
import { useTrackedSymptoms } from "../../../hooks/useTrackedSymptoms";
import { services } from "../../../services";
import { auth } from "../../../config/firebase";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ISymptomState } from "../../../entities/ISymptomState";
import { createSeverityList } from "../../../utils/createSeverityList";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { filterUsedSymptoms } from "../../../utils/filterUsedSymptoms";
import { IAddSymptomFormStateKey } from "../../../entities/IAddSymptomFormStateKey";
import { IAddSymptomFormStateKeyValue } from "../../../entities/IAddSymptomFormStateKeyValue";
import { adjustSeverityValue } from "../../../utils/adjustSeverityValue";

const AddSymptomContext = createContext({} as IAddSymptomContext);

const DEBOUNCE_TIME = 250;

const INITAL_FORM_STATE: IAddSymptomFormState = {
  selectedSymptom: INITAL_SYMPTOM,
  currentSeverity: INITAL_OPTION,
  targetSeverity: INITAL_OPTION,
  targetDate: null,
  search: "",
  isLoading: false,
};

const INITAL_SYMPTOM_STATE: ISymptomState = {
  filteredSymptoms: [],
};

export const AddSymptomProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { data: symptoms, isFetching: isFetchingSymptoms } =
    useSymptomsContext();
  const { severityOptions, formattedSeverityOptions } = useSeverityRatings();
  const { state: trackedSymptomsState } = useTrackedSymptoms({});
  const { currentSymptomPage, setCurrentSymptomPage } =
    useCurrentEntityContext();
  const [symptomState, setSymptomState] =
    useState<ISymptomState>(INITAL_SYMPTOM_STATE);
  const [formState, setFormState] =
    useState<IAddSymptomFormState>(INITAL_FORM_STATE);

  const symptomList = filterUsedSymptoms(
    symptoms,
    trackedSymptomsState?.trackedSymptoms
  );

  useEffect(() => {
    setSymptomState({
      filteredSymptoms: symptomList,
    });
  }, [symptomList.length]);

  // STATE METHODS
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredSymptoms = filterSymptoms(formState?.search, symptomList);

      setSymptomState((prev) => ({
        ...prev,
        filteredSymptoms: filteredSymptoms,
      }));
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounce);
    };
  }, [formState?.search]);

  const handleOnChange = (
    key: IAddSymptomFormStateKey,
    value: IAddSymptomFormStateKeyValue
  ) => {
    if (key === "currentSeverity" || key === "targetSeverity") {
      const formattedValue = adjustSeverityValue(value);
      setFormState((prev) => ({ ...prev, [key]: formattedValue }));
      return;
    }

    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnSelect = (item: ISymptom) => {
    if (formState?.selectedSymptom?.id === item?.id)
      return setFormState((prev) => ({
        ...prev,
        selectedSymptom: INITAL_SYMPTOM,
      }));

    setFormState((prev) => ({ ...prev, selectedSymptom: item }));
  };

  const _handleSetLoading = (boolean: boolean) => {
    setFormState((prev) => ({ ...prev, isLoading: boolean }));
  };

  // ACTION METHODS
  const handleOnSubmit = async () => {
    try {
      _handleSetLoading(true);
      await services.post.trackedSymptom({
        userId: auth?.currentUser?.uid,
        symptomId: formState?.selectedSymptom?.id,
        targetDate: formState?.targetDate,
        targetSeverity: formState?.targetSeverity,
        currentSeverity: formState?.currentSeverity,
      });

      await services.post.score({
        userId: auth?.currentUser?.uid,
        symptomId: formState?.selectedSymptom?.id,
        currentSeverity: formState?.currentSeverity,
        comment: "Added First Severity Rating",
      });

      await services.post.notification({
        userId: auth?.currentUser?.uid,
        title: "Added New Symptom",
        subTitle: `You added “${formState?.selectedSymptom?.name}” to your Tracked Symptoms list`,
      });

      setCurrentSymptomPage(currentSymptomPage + 1);
      setFormState(INITAL_FORM_STATE);
      toast.successToast("Successfully added the new symptom");
      navigation.navigate("User Symptoms");
    } catch (e: any) {
      toast.errorToast("Failed to add the symptom. Try again later.");
    }
  };

  const isDisabled =
    !formState.currentSeverity?.id ||
    !formState?.targetSeverity ||
    !formState?.targetDate ||
    !formState.selectedSymptom?.id;

  const isFetching = isFetchingSymptoms || trackedSymptomsState.isFetching;

  return (
    <AddSymptomContext.Provider
      value={{
        state: {
          symptomList: symptomState?.filteredSymptoms,
          selectedSymptom: formState?.selectedSymptom,
          currentSeverity: formState?.currentSeverity,
          targetSeverity: formState?.targetSeverity,
          search: formState?.search,
          targetDate: formState?.targetDate,
          isFetching: isFetching,
          isLoading: formState?.isLoading,
          isDisabled: isDisabled,
          targetSeverityList: createSeverityList({
            severityList: formattedSeverityOptions,
            selectedSeverity: formState?.currentSeverity,
            type: "target",
          }),
          currentSeverityList: createSeverityList({
            severityList: formattedSeverityOptions,
            selectedSeverity: formState?.targetSeverity,
            type: "current",
          }),
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnSubmit: handleOnSubmit,
          handleOnSelect: handleOnSelect,
        },
      }}
    >
      {children}
    </AddSymptomContext.Provider>
  );
};

export const useAddSymptomContext = () => {
  return useContext(AddSymptomContext);
};

interface IAddSymptomContext {
  state: {
    symptomList: ISymptom[];
    selectedSymptom: ISymptom;
    currentSeverity: IOption;
    targetSeverity: IOption;
    search: string;
    targetDate: Date;
    isLoading: boolean;
    isFetching: boolean;
    isDisabled: boolean;
    targetSeverityList: IOption[];
    currentSeverityList: IOption[];
  };
  methods: {
    handleOnChange: (
      key: IAddSymptomFormStateKey,
      value: IAddSymptomFormStateKeyValue
    ) => void;
    handleOnSubmit: () => void;
    handleOnSelect: (item: ISymptom) => void;
  };
}

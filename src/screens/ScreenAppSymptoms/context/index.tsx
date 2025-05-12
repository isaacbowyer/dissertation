import { createContext, useContext, useEffect, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { SERVICES_LIMITS } from "../../../config/services";
import { services } from "../../../services";
import { formatUserSymptoms } from "../../../utils/formatUserSymptoms";
import { IAdvancedSearch } from "../../../entities/IAdvancedSearch";
import { INITAL_OPTION } from "../../../data/defaultValues";
import { useSeverityTypes } from "../../../hooks/useSeverityTypes";
import { IOption } from "../../../entities/IOption";
import { IAdvancedSearchStateKey } from "../../../entities/IAdvancedSearchStateKey";
import { IAdvancedSearchStateKeyValue } from "../../../entities/IAdvancedSearchStateKeyValue";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { useTrackedSymptoms } from "../../../hooks/useTrackedSymptoms";
import { auth } from "../../../config/firebase";
import { useSeverityRatings } from "../../../hooks/useSeverityRatings";
import { createSearchConfig } from "../../../utils/createSearchConfig";
import { ITrackedSymptomsState } from "../../../entities/ITrackedSymptomsState";
import { decideScreenStateToRender } from "../../../utils/decideScreenStateToRender";
import { IRenderOptionsOutput } from "../../../entities/IRenderOptionsOutput";
import { ITrackedSymptom } from "../../../entities/ITrackedSymptom";
import { adjustSeverityValue } from "../../../utils/adjustSeverityValue";

const TrackedSymptomsContext = createContext({} as ITrackedSymptomsContext);

const TAGS = ["current", "past"];

const DEBOUNCE_TIME = 250;

const INITAL_STATE: ITrackedSymptomsState = {
  currentPage: 1,
  isLoading: false,
  source: "current",
  isSearchActive: false,
};

const INITAL_SEARCH: IAdvancedSearch = {
  symptom: "",
  targetDate: null,
  currentRating: INITAL_OPTION,
  targetRating: INITAL_OPTION,
  severityType: INITAL_OPTION,
};

export const TrackedSymptomsProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { setCurrentSymptom } = useCurrentEntityContext();

  const [state, setState] = useState<ITrackedSymptomsState>(INITAL_STATE);
  const [searchState, setSearchState] =
    useState<IAdvancedSearch>(INITAL_SEARCH);
  const [symptomName, setSymptomName] = useState<string>("");

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  // DATA
  const { data: symptomList } = useSymptomsContext();

  const { state: trackedSymptomsState, methods: trackedSymptomsMethods } =
    useTrackedSymptoms({
      limit: LIMIT,
      skip: SKIP,
      source: state?.source,
      currentPage: state?.currentPage,
      config: createSearchConfig({
        isSearchActive: state?.isSearchActive,
        search: searchState,
      }),
    });

  const userSymptoms = formatUserSymptoms({
    symptoms: symptomList,
    trackedSymptoms: trackedSymptomsState.trackedSymptoms,
  });

  const severityTypeOptions = useSeverityTypes();
  const { formattedSeverityOptions } = useSeverityRatings();

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setState((prev) => ({ ...prev, isLoading: boolean }));
  };

  const handleOnChange = (
    key: IAppSymptomsStateKey,
    value: IAppSymptomsStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetSearch = (
    key: IAdvancedSearchStateKey,
    value: IAdvancedSearchStateKeyValue
  ) => {
    if (key === "currentRating" || key === "targetRating") {
      const formattedValue = adjustSeverityValue(value);
      setSearchState((prev) => ({ ...prev, [key]: formattedValue }));
      return;
    }

    setSearchState((state) => ({ ...state, [key]: value }));
  };

  const handleSetSymptomName = (value: string) => {
    setSymptomName(value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSetSearch("symptom", symptomName);
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounce);
    };
  }, [symptomName]);

  // ACTION METHODS
  const handleToggleSearch = () => {
    setSearchState(INITAL_SEARCH);
    setSymptomName("");
    handleOnChange("isSearchActive", !state?.isSearchActive);
  };

  // ACTION METHODS
  const handleDeleteTrackedSymptom = async (symptom: ITrackedSymptom) => {
    try {
      _handleSetLoading(true);

      await services.delete.trackedSymptom(symptom?.id);

      await services.delete.scores({
        userId: auth.currentUser.uid,
        symptomId: symptom?.symptomId,
      });

      await services.post.notification({
        userId: auth?.currentUser?.uid,
        title: "Removed Symptom",
        subTitle: `You removed “${symptom?.name}” from your Tracked Symptoms list`,
      });

      trackedSymptomsMethods.handleOnRefetch();
      toast.successToast("Successfuly removed this tracked symptom");
    } catch (e: any) {
      toast.errorToast("Failed to delete this tracked symptom.");
    } finally {
      setState(INITAL_STATE);
    }
  };

  const handleNavigateToTrackedSymptom = (symptom: ITrackedSymptom) => {
    setCurrentSymptom(symptom);
    setState(INITAL_STATE);
    navigation.navigate("Symptom Goal");
  };

  const handleAddTrackedSymptom = () => {
    navigation.navigate("Add Symptom");
  };

  const isInvalidSearch = state.isSearchActive && !trackedSymptomsState.count;

  const screenState = decideScreenStateToRender({
    isFetching: trackedSymptomsState.isFetching,
    isInvalidSearch: isInvalidSearch,
    entriesLength: trackedSymptomsState.trackedSymptoms.length,
  });

  return (
    <TrackedSymptomsContext.Provider
      value={{
        state: {
          isFetching: trackedSymptomsState.isFetching,
          isLoading: state?.isLoading,
          screenState: screenState,
          currentPage: state?.currentPage,
          count: trackedSymptomsState?.count,
          totalPages: trackedSymptomsState?.totalPages,
          symptomName: symptomName,
          limit: LIMIT,
          symptoms: userSymptoms,
          tagList: TAGS,
          severityTypeOptions: severityTypeOptions,
          ratingOptions: formattedSeverityOptions,
          source: state?.source,
          isSearchActive: state?.isSearchActive,
          symptom: searchState?.symptom,
          targetDate: searchState?.targetDate,
          currentRating: searchState?.currentRating,
          targetRating: searchState?.targetRating,
          severityType: searchState?.severityType,
        },
        methods: {
          handleOnDelete: handleDeleteTrackedSymptom,
          handleOnPress: handleNavigateToTrackedSymptom,
          handleOnAdd: handleAddTrackedSymptom,
          handleOnChange: handleOnChange,
          handleToggleSearch: handleToggleSearch,
          handleSetSearch: handleSetSearch,
          handleSetSymptomName: handleSetSymptomName,
        },
      }}
    >
      {children}
    </TrackedSymptomsContext.Provider>
  );
};

export const useTrackedSymptomsContext = () => {
  return useContext(TrackedSymptomsContext);
};

interface ITrackedSymptomsContext {
  state: {
    isFetching: boolean;
    isLoading: boolean;
    screenState: IRenderOptionsOutput;
    currentPage: number;
    symptomName: string;
    count: number;
    totalPages: number;
    limit: number;
    symptoms: ITrackedSymptom[];
    source: string;
    tagList: string[];
    severityTypeOptions: IOption[];
    ratingOptions: IOption[];
    isSearchActive: boolean;
    symptom: string;
    currentRating: IOption;
    targetRating: IOption;
    targetDate: Date;
    severityType: IOption;
  };
  methods: {
    handleOnDelete: (symptom: ITrackedSymptom) => void;
    handleOnPress: (symptom: ITrackedSymptom) => void;
    handleOnAdd: () => void;
    handleOnChange: (
      key: IAppSymptomsStateKey,
      value: IAppSymptomsStateKeyValue
    ) => void;
    handleSetSearch: (
      key: IAdvancedSearchStateKey,
      value: IAdvancedSearchStateKeyValue
    ) => void;
    handleSetSymptomName: (value: string) => void;
    handleToggleSearch: () => void;
  };
}

type IAppSymptomsStateKey = keyof ITrackedSymptomsState;
type IAppSymptomsStateKeyValue = boolean | number | string;

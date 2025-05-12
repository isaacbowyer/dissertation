import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { getDaysLeft } from "../../../utils/getDaysLeft";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { services } from "../../../services";
import { useSymptomRatings } from "../../../hooks/useSymptomRatings";
import { SERVICES_LIMITS } from "../../../config/services";
import { useSeverityRatings } from "../../../hooks/useSeverityRatings";
import { IOption } from "../../../entities/IOption";
import { IScore } from "../../../entities/IScore";
import { useUsersContext } from "../../../contexts/useUsersContext";
import { auth } from "../../../config/firebase";
import { Linking } from "react-native";
import { ISymptomGoalStateKey } from "../../../entities/ISymptomGoalStateKey";
import { ISymptomGoalStateKeyValue } from "../../../entities/ISymptomGoalStateKeyValue";
import { ISymptomGoalState } from "../../../entities/ISymptomGoalState";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { findOption } from "../../../utils/findOption";
import { useResourceTypesContext } from "../../../contexts/useResourceTypesContext";
import { IResourceWithLike } from "../../../entities/IResourceWithLike";
import { useResources } from "../../../hooks/useResources";
import { findTodaysDateInScores } from "../../../utils/findTodaysDateInScores";
import { createSeverityList } from "../../../utils/createSeverityList";
import { checkPastDate } from "../../../utils/checkIsPastDate";
import { INITAL_TAGS } from "../../../data/defaultValues";
import { IChartType } from "../../../entities/IChartType";
import { IResourceTypeTag } from "../../../entities/IResourceTypeTag";
import { calculateAverageScores } from "../../../utils/calculateAverageScores";
import { adjustSeverityValue } from "../../../utils/adjustSeverityValue";
import { addWorstOrBestToSeverity } from "../../../utils/addWorstOrBestToSeverity";

const CHART_TAGS: IChartType[] = ["Week", "Month"];

const SymptomGoalContext = createContext({} as ISymptomGoalContext);

export const SymptomGoalProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { severityOptions, formattedSeverityOptions } = useSeverityRatings();
  const { currentSymptom } = useCurrentEntityContext();
  const { data: users, isFetching: isFetchingUsers } = useUsersContext();
  const { data: resourceTypes, isFetching: isFetchingTypes } =
    useResourceTypesContext();

  const INITIAL_STATE: ISymptomGoalState = {
    targetSeverity: findOption(
      severityOptions,
      "name",
      String(currentSymptom?.targetSeverity)
    ),
    targetDate: currentSymptom?.targetDate,
    currentPage: 1,
    isLoading: false,
    source: "All",
    chartType: "Week",
  };

  const [state, setState] = useState<ISymptomGoalState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  const { scores, isFetching: isFetchingRatings } = useSymptomRatings();

  const averageScoresLimit = state.chartType === "Week" ? 5 : 4;

  const averageScores = calculateAverageScores({
    data: scores,
    interval: state.chartType,
    limit: averageScoresLimit,
  });

  const { state: resourcesState, methods: resourcesMethods } = useResources({
    limit: LIMIT,
    source: findOption(resourceTypes, "name", state?.source),
    currentPage: state?.currentPage,
    name: "symptom",
    refId: currentSymptom?.symptomId,
    skip: SKIP,
  });

  // ACTION METHODS
  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const _handleOnEdit = async (
    newTargetDate: Date,
    newTargetSeverity: IOption
  ) => {
    try {
      _handleSetLoading(true);

      await services.update.trackedSymptom({
        id: currentSymptom?.id,
        currentSeverity: currentSymptom?.currentSeverity,
        targetSeverity: +newTargetSeverity?.name,
        targetDate: newTargetDate,
      });

      await services.post.notification({
        userId: auth?.currentUser?.uid,
        title: "Updated Symptom Details",
        subTitle: `You adjusted your “${currentSymptom?.name}” symptom details.`,
      });

      toast.successToast("Successfully updated the symptom's details");
    } catch (e: any) {
      toast.errorToast("Unable to update the symptom. Try again later");
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleOnChange = (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => {
    if (key === "targetDate") {
      setState((prev) => ({ ...prev, targetDate: value as Date }));
      return _handleOnEdit(value as Date, state?.targetSeverity);
    }

    if (key === "targetSeverity") {
      const formattedValue = adjustSeverityValue(value);
      setState((prev) => ({ ...prev, targetSeverity: formattedValue }));
      return _handleOnEdit(state?.targetDate, formattedValue as IOption);
    }

    if (key === "source")
      return setState((prev) => ({
        ...prev,
        source: value as IResourceTypeTag,
        currentPage: 1,
      }));

    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOnLikeResource = async (resource: IResourceWithLike) => {
    const isLiked = resource?.isLiked;

    try {
      _handleSetLoading(true);

      await services.composition.resourceLike({
        id: resource?.likedId,
        resourceId: resource?.id,
        userId: auth?.currentUser?.uid,
      });

      toast.successToast(
        `Successfuly ${isLiked ? "unliked" : "liked"} the symptom resource`
      );
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast(
        `Unable to ${isLiked ? "unlike" : "like"} the symptom resource.`
      );
    } finally {
      _handleSetLoading(false);
      resourcesMethods.handleOnRefetch();
    }
  };

  const handleOnViewResource = (resource: IResourceWithLike) => {
    Linking.openURL(resource?.link).catch((err) =>
      toast.errorToast("Unable to open this resource link")
    );
  };

  const handleOnTrackSymptom = () => {
    navigation.navigate("Symptom Progress");
  };

  const isPastDateReached = checkPastDate(state?.targetDate);
  const isButtonDisabled = findTodaysDateInScores(scores) || isPastDateReached;

  const isFetching =
    isFetchingRatings ||
    resourcesState.isFetching ||
    isFetchingUsers ||
    isFetchingTypes;

  return (
    <SymptomGoalContext.Provider
      value={{
        state: {
          title: currentSymptom?.name,
          currentSeverity: currentSymptom?.currentSeverity,
          targetSeverity: state?.targetSeverity,
          formattedTargetSeverity: addWorstOrBestToSeverity(
            state?.targetSeverity
          ),
          targetDate: state?.targetDate,
          activeSource: state?.source,
          daysLeft: getDaysLeft(state?.targetDate),
          isFetching: isFetching,
          isButtonDisabled: isButtonDisabled,
          isPastDateReached: isPastDateReached,
          currentPage: state?.currentPage,
          count: resourcesState.totalCount,
          totalPages: resourcesState.totalPages,
          limit: LIMIT,
          severityList: createSeverityList({
            severityList: formattedSeverityOptions,
            selectedSeverity: findOption(
              severityOptions,
              "name",
              String(currentSymptom?.currentSeverity)
            ),
            type: "target",
          }),
          averageScores: averageScores,
          numberOfUsers: users?.count,
          resources: resourcesState?.resources,
          resourceTypes: resourceTypes,
          resourceTags: INITAL_TAGS,
          chartTags: CHART_TAGS,
          chartType: state.chartType,
          averageScoresLimit: averageScoresLimit,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnPress: handleOnTrackSymptom,
          handleOnLike: handleOnLikeResource,
          handleOnView: handleOnViewResource,
        },
      }}
    >
      {children}
    </SymptomGoalContext.Provider>
  );
};

export const useSymptomGoalContext = () => {
  return useContext(SymptomGoalContext);
};

interface ISymptomGoalContext {
  state: {
    title: string;
    currentSeverity: number;
    targetSeverity: IOption;
    formattedTargetSeverity: IOption;
    targetDate: Date;
    daysLeft: number;
    activeSource: string;
    isFetching: boolean;
    isButtonDisabled: boolean;
    isPastDateReached: boolean;
    currentPage: number;
    count: number;
    totalPages: number;
    limit: number;
    severityList: IOption[];
    averageScores: IScore[];
    numberOfUsers: number;
    resources: IResourceWithLike[];
    resourceTypes: IOption[];
    resourceTags: IResourceTypeTag[];
    chartTags: IChartType[];
    chartType: IChartType;
    averageScoresLimit: number;
  };
  methods: {
    handleOnChange: (
      key: ISymptomGoalStateKey,
      value: ISymptomGoalStateKeyValue
    ) => void;
    handleOnPress: () => void;
    handleOnLike: (item: IResourceWithLike) => void;
    handleOnView: (item: IResourceWithLike) => void;
  };
}

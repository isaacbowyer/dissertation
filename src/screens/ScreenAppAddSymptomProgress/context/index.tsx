import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { INITAL_OPTION } from "../../../data/defaultValues";
import { IOption } from "../../../entities/IOption";
import { useSeverityRatings } from "../../../hooks/useSeverityRatings";
import { services } from "../../../services";
import { auth } from "../../../config/firebase";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IAddSymptomProgressFormState } from "../../../entities/IAddSymptomProgressFormState";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { adjustSeverityValue } from "../../../utils/adjustSeverityValue";

const AddSymptomProgressContext = createContext(
  {} as IAddSymptomProgressContext
);

const INITAL_FORM_STATE: IAddSymptomProgressFormState = {
  currentSeverity: INITAL_OPTION,
  comment: "",
  isLoading: false,
};

export const AddSymptomProgressProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { formattedSeverityOptions } = useSeverityRatings();
  const {
    currentSymptom,
    setCurrentSymptom,
    currentSymptomPage,
    setCurrentSymptomPage,
  } = useCurrentEntityContext();

  const [formState, setFormState] =
    useState<IAddSymptomProgressFormState>(INITAL_FORM_STATE);

  const handleOnChange = (
    key: IAddSymptomProgressFormStateKey,
    value: IAddSymptomProgressFormStateKeyValue
  ) => {
    let formattedValue = value;
    if (key === "currentSeverity") {
      formattedValue = adjustSeverityValue(value);
    }

    setFormState((prev) => ({ ...prev, [key]: formattedValue }));
  };

  const _handleSetLoading = (boolean: boolean) => {
    setFormState((prev) => ({ ...prev, isLoading: boolean }));
  };

  // ACTION METHODS
  const handleOnSubmit = async () => {
    try {
      _handleSetLoading(true);

      const formattedCurrentSeverity = adjustSeverityValue(
        formState?.currentSeverity
      );
      const value = Number(formattedCurrentSeverity?.name);

      await services.post.score({
        userId: auth.currentUser.uid,
        symptomId: currentSymptom.symptomId,
        comment: formState?.comment,
        currentSeverity: value,
      });

      await services.update.trackedSymptom({
        id: currentSymptom.id,
        currentSeverity: value,
        targetSeverity: currentSymptom?.targetSeverity,
        targetDate: currentSymptom?.targetDate,
      });

      await services.post.notification({
        userId: auth?.currentUser?.uid,
        title: "Added Daily Severity",
        subTitle: `You updated your daily progress for “${currentSymptom?.name}”`,
      });

      setCurrentSymptom({ ...currentSymptom, targetSeverity: value });
      setFormState(INITAL_FORM_STATE);
      setCurrentSymptomPage(currentSymptomPage + 1);
      toast.successToast("Successfully added the daily symptom severity");
      navigation.navigate("User Symptoms");
    } catch (e: any) {
      toast.errorToast("Failed to add the symptom severity. Try again later");
    }
  };

  const isDisabled = !formState.currentSeverity?.id;

  return (
    <AddSymptomProgressContext.Provider
      value={{
        state: {
          currentSeverity: formState?.currentSeverity,
          comment: formState?.comment,
          isLoading: formState?.isLoading,
          isDisabled: isDisabled,
          severityList: formattedSeverityOptions,
          name: currentSymptom?.name,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnSubmit: handleOnSubmit,
        },
      }}
    >
      {children}
    </AddSymptomProgressContext.Provider>
  );
};

export const useAddSymptomProgressContext = () => {
  return useContext(AddSymptomProgressContext);
};

interface IAddSymptomProgressContext {
  state: {
    comment: string;
    currentSeverity: IOption;
    isLoading: boolean;
    isDisabled: boolean;
    severityList: IOption[];
    name: string;
  };
  methods: {
    handleOnChange: (
      key: IAddSymptomProgressFormStateKey,
      value: IAddSymptomProgressFormStateKeyValue
    ) => void;
    handleOnSubmit: () => void;
  };
}

type IAddSymptomProgressFormStateKey = keyof IAddSymptomProgressFormState;
type IAddSymptomProgressFormStateKeyValue = string | IOption;

import { VStack } from "@gluestack-ui/themed";
import { IAdvancedSearchStateKey } from "../../../entities/IAdvancedSearchStateKey";
import { IAdvancedSearchStateKeyValue } from "../../../entities/IAdvancedSearchStateKeyValue";
import { Input } from "../../atoms/Input";
import { DatePicker } from "../../atoms/DatePicker";
import { IAdvancedSearchState } from "../../../entities/IAdvancedSearchState";
import { Select } from "../../atoms/Select";
import { colors } from "../../../data/colors";
import { compareValues } from "../../../utils/compareValues";

interface IAdvancedSearchProps {
  state: IAdvancedSearchState;
  methods: {
    handleOnChange: (
      key: IAdvancedSearchStateKey,
      value: IAdvancedSearchStateKeyValue
    ) => void;
    handleSetSymptomName: (value: string) => void;
  };
}

export const AdvancedSearch = ({ state, methods }: IAdvancedSearchProps) => {
  const isCurrent = compareValues(state?.source, "current");

  return (
    <VStack
      width="$full"
      space="md"
      borderWidth="$1"
      borderColor={colors.gray}
      padding="$4"
      borderRadius="$lg"
      marginBottom="$4"
    >
      <Input
        label="Symptom"
        value={state?.symptom}
        onChange={(e) => methods?.handleSetSymptomName(e.nativeEvent.text)}
      />

      <Select
        selectedOption={state?.currentRating}
        label="Current Severity"
        items={state?.ratingList}
        onChange={(value) => methods?.handleOnChange("currentRating", value)}
      />

      <Select
        selectedOption={state?.targetRating}
        label="Target Severity"
        items={state?.ratingList}
        onChange={(value) => methods?.handleOnChange("targetRating", value)}
      />

      <Select
        selectedOption={state?.targetRating}
        label="Severity Type"
        items={state?.severityList}
        onChange={(value) => methods?.handleOnChange("severityType", value)}
      />

      <DatePicker
        label="Target Date"
        date={state?.targetDate}
        onChange={(event, newDate) =>
          methods?.handleOnChange("targetDate", newDate)
        }
        maxDate={isCurrent ? null : new Date()}
        minDate={isCurrent ? new Date() : null}
      />
    </VStack>
  );
};

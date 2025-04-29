import { Text, VStack } from "@gluestack-ui/themed";
import { DatePicker } from "../../../../components/atoms/DatePicker";
import { IOption } from "../../../../entities/IOption";
import { Select } from "../../../../components/atoms/Select";
import { colors } from "../../../../data/colors";
import { createSeverityList } from "../../../../utils/createSeverityList";
import { IAddSymptomFormStateKey } from "../../../../entities/IAddSymptomFormStateKey";
import { IAddSymptomFormStateKeyValue } from "../../../../entities/IAddSymptomFormStateKeyValue";

interface IRatingSymptomSectionProps {
  targetDate: Date;
  currentSeverity: IOption;
  targetSeverity: IOption;
  targetSeverityList: IOption[];
  currentSeverityList: IOption[];
  handleOnChange: (
    key: IAddSymptomFormStateKey,
    value: IAddSymptomFormStateKeyValue
  ) => void;
}

export const RatingSymptomSection = ({
  targetDate,
  currentSeverity,
  targetSeverity,
  currentSeverityList,
  targetSeverityList,
  handleOnChange,
}: IRatingSymptomSectionProps) => {
  return (
    <VStack space="xl" mb="$8">
      <Text fontSize={18} bold color={colors.black}>
        Rate the Severity of your Symptom
      </Text>

      <VStack space="md">
        <Select
          selectedOption={currentSeverity}
          label="Current Severity"
          items={currentSeverityList}
          onChange={(value) => handleOnChange("currentSeverity", value)}
        />

        <Text fontSize={15} color="gray" fontStyle="italic">
          This value must be higher than the Target Severity
        </Text>
      </VStack>

      <VStack space="md">
        <Select
          selectedOption={targetSeverity}
          label="Target Severity"
          items={targetSeverityList}
          onChange={(value) => handleOnChange("targetSeverity", value)}
        />

        <Text fontSize={15} color="gray" fontStyle="italic">
          This value must be lower than the Current Severity
        </Text>
      </VStack>

      <DatePicker
        label="Date to acheieve Target Severity"
        date={targetDate}
        onChange={(event, newDate) => handleOnChange("targetDate", newDate)}
        minDate={new Date()}
      />
    </VStack>
  );
};

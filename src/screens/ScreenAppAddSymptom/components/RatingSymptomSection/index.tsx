import { Text, VStack } from "@gluestack-ui/themed";
import { IAddSymptomStateKey } from "../../../../entities/IAddSymptomStateKey";
import { IAddSymptomStateKeyValue } from "../../../../entities/IAddSymptomStateKeyValue";
import { DatePicker } from "../../../../components/atoms/DatePicker";
import { IOption } from "../../../../entities/IOption";
import { Select } from "../../../../components/atoms/Select";
import { colors } from "../../../../data/colors";
import { createSeverityList } from "../../../../utils/createSeverityList";

interface IRatingSymptomSectionProps {
  targetDate: Date;
  currentSeverity: IOption;
  targetSeverity: IOption;
  severityList: IOption[];
  handleOnChange: (
    key: IAddSymptomStateKey,
    value: IAddSymptomStateKeyValue
  ) => void;
}

export const RatingSymptomSection = ({
  targetDate,
  currentSeverity,
  targetSeverity,
  severityList,
  handleOnChange,
}: IRatingSymptomSectionProps) => {
  return (
    <VStack space="xl" mb="$8">
      <Text fontSize={18} bold color={colors.black}>
        Rate the Severity of your Symptom
      </Text>

      <Select
        selectedOption={currentSeverity}
        label="Current Severity"
        items={createSeverityList(severityList, targetSeverity)}
        onChange={(value) => handleOnChange("currentSeverity", value)}
      />

      <Select
        selectedOption={targetSeverity}
        label="Target Severity"
        items={createSeverityList(severityList, currentSeverity)}
        onChange={(value) => handleOnChange("targetSeverity", value)}
      />

      <DatePicker
        label="Date to acheieve Target Severity"
        date={targetDate}
        onChange={(event, newDate) => handleOnChange("targetDate", newDate)}
        minDate={new Date()}
      />
    </VStack>
  );
};

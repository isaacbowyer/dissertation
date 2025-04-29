import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import {
  AddSymptomProgressProvider,
  useAddSymptomProgressContext,
} from "./context";
import { Button } from "../../components/atoms/Button";
import { Select } from "../../components/atoms/Select";
import { Textarea } from "../../components/atoms/Textarea";

const AddSymptomProgress = () => {
  const { state, methods } = useAddSymptomProgressContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader
            title={`Symptom Progres - ${state?.name}`}
            isFetching={false}
          />

          <Select
            selectedOption={state?.currentSeverity}
            label="Current Severity"
            items={state?.severityList}
            onChange={(value) =>
              methods.handleOnChange("currentSeverity", value)
            }
          />

          <Textarea
            label="Comment"
            value={state?.comment}
            onChange={(e) =>
              methods.handleOnChange("comment", e.nativeEvent.text)
            }
          />

          <Button.Solid
            text="Submit"
            onPress={methods.handleOnSubmit}
            isDisabled={state.isDisabled}
            isLoading={state.isLoading}
          />
        </VStack>
      }
    />
  );
};
export const AddSymptomProgressScreen = ({ navigation }) => {
  return (
    <AddSymptomProgressProvider>
      <AddSymptomProgress />
    </AddSymptomProgressProvider>
  );
};

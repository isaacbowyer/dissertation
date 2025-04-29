import { Divider, VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { AddSymptomProvider, useAddSymptomContext } from "./context";
import { SelectSymptomSection } from "./components/SelectSymptomSection";
import { Button } from "../../components/atoms/Button";
import { RatingSymptomSection } from "./components/RatingSymptomSection";

const AddSymptom = () => {
  const { state, methods } = useAddSymptomContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <MainHeader title="Add Symptom" isFetching={state?.isFetching} />

          <SelectSymptomSection
            symptoms={state?.symptomList}
            selectedSymptom={state?.selectedSymptom}
            isFetching={state?.isFetching}
            search={state?.search}
            handleOnChange={methods?.handleOnChange}
            handleOnSelect={methods?.handleOnSelect}
          />

          <Divider mt="$0.5" mb="$4" />

          <RatingSymptomSection
            severityList={state?.severityList}
            targetDate={state?.targetDate}
            currentSeverity={state?.currentSeverity}
            targetSeverity={state?.targetSeverity}
            handleOnChange={methods?.handleOnChange}
          />

          <Button.Solid
            text="Add Symptom"
            onPress={methods.handleOnSubmit}
            isDisabled={state.isDisabled}
            isLoading={state.isLoading}
          />
        </VStack>
      }
    />
  );
};
export const AddSymptomScreen = ({ navigation }) => {
  return (
    <AddSymptomProvider>
      <AddSymptom />
    </AddSymptomProvider>
  );
};

import { VStack } from "@gluestack-ui/themed";
import { Accordion } from "../../../../components/atoms/Accordion";
import { ISymptom } from "../../../../entities/ISymptom";
import { IAddSymptomStateKey } from "../../../../entities/IAddSymptomFormStateKey";
import { IAddSymptomStateKeyValue } from "../../../../entities/IAddSymptomFormStateKeyValue";
import { Input } from "../../../../components/atoms/Input";
import { ICONS } from "../../../../data/icons";
import { AddSymptomContainer } from "../../../../components/organisms/AddSymptomContainer";
import { Text } from "../../../../components/atoms/Text";

interface ISelectSymptomSectionProps {
  symptoms: ISymptom[];
  selectedSymptom: ISymptom;
  isFetching: boolean;
  search: string;
  handleOnChange: (
    key: IAddSymptomStateKey,
    value: IAddSymptomStateKeyValue
  ) => void;
  handleOnSelect: (item: ISymptom) => void;
}

export const SelectSymptomSection = ({
  symptoms,
  selectedSymptom,
  isFetching,
  search,
  handleOnChange,
  handleOnSelect,
}: ISelectSymptomSectionProps) => {
  return (
    <VStack>
      <Accordion
        title="Select a Symptom"
        isDisabled={isFetching}
        hiddenSection={
          <VStack space="md">
            <Input
              placeholder="Search..."
              type="rounded"
              value={search}
              icon={ICONS.SEARCH}
              onChange={(e) => handleOnChange("search", e.nativeEvent.text)}
            />

            {!symptoms?.length ? (
              <Text.Regular color="gray">
                No symptoms match this search criteria
              </Text.Regular>
            ) : (
              <AddSymptomContainer
                symptoms={symptoms}
                selectedSymptom={selectedSymptom}
                handleOnSelect={handleOnSelect}
              />
            )}
          </VStack>
        }
      />
    </VStack>
  );
};

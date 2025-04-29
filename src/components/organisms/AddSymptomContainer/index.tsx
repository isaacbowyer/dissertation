import { VStack } from "@gluestack-ui/themed";
import { ISymptom } from "../../../entities/ISymptom";
import { AddSymptomCard } from "../../modules/AddSymptomCard";
import { compareValues } from "../../../utils/compareValues";

interface IAddSymptomContainer {
  symptoms: ISymptom[];
  selectedSymptom: ISymptom;
  handleOnSelect: (symptom: ISymptom) => void;
}

export const AddSymptomContainer = ({
  symptoms,
  selectedSymptom,
  handleOnSelect,
}: IAddSymptomContainer) => {
  return (
    <VStack space="md" width="$full">
      {symptoms?.map((item) => {
        const isSelected = compareValues(item?.id, selectedSymptom.id);

        return (
          <AddSymptomCard
            key={item?.id}
            name={item?.name}
            description={item?.description}
            imageUri={item?.imageUri}
            isSelected={isSelected}
            handleOnPress={() => handleOnSelect(item)}
          />
        );
      })}
    </VStack>
  );
};

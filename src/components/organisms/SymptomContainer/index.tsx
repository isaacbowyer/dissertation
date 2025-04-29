import { VStack } from "@gluestack-ui/themed";
import { SymptomCardContainer } from "../../modules/SymptomCardContainer";
import { ITrackedSymptom } from "../../../entities/ITrackedSymptom";

interface ISymptomContainer {
  items: ITrackedSymptom[];
  isLoading: boolean;
  handleOnView: (symptom: ITrackedSymptom) => void;
  handleOnDelete: (symptom: ITrackedSymptom) => void;
}

export const SymptomContainer = ({
  items,
  isLoading,
  handleOnView,
  handleOnDelete,
}: ISymptomContainer) => {
  return (
    <VStack space="md" width="$full">
      {items?.map((item) => (
        <SymptomCardContainer
          key={item?.id}
          name={item?.name}
          currentSeverity={item?.currentSeverity}
          targetSeverity={item?.targetSeverity}
          isLoading={isLoading}
          severityType={item?.severityType}
          targetDate={item?.targetDate}
          handleOnDelete={() => handleOnDelete(item)}
          handleOnView={() => handleOnView(item)}
        />
      ))}
    </VStack>
  );
};

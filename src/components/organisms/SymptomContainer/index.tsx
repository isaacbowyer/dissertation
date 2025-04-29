import { VStack } from "@gluestack-ui/themed";
import { IUserSymptom } from "../../../entities/IUserSymptom";
import { SymptomCard } from "../../modules/SymptomCard";

interface ISymptomContainer {
  items: IUserSymptom[];
  handleOnView: (symptom: IUserSymptom) => void;
  handleOnDelete: (symptom: IUserSymptom) => void;
}

export const SymptomContainer = ({
  items,
  handleOnView,
  handleOnDelete,
}: ISymptomContainer) => {
  return (
    <VStack space="md" width="$full">
      {items?.map((item) => (
        <SymptomCard
          key={item?.id}
          label={item?.name}
          severityType={item?.severityType}
          imageUri={item?.imageUri}
          targetDate={item?.targetDate}
          handleOnDelete={() => handleOnDelete(item)}
          handleOnView={() => handleOnView(item)}
        />
      ))}
    </VStack>
  );
};

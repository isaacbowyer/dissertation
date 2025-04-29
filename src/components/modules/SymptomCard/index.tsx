import { HStack, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { ISeverityType } from "../../../entities/ISeverityType";
import { DeleteIcon } from "../../atoms/DeleteIcon";
import { Text } from "../../atoms/Text";
import { Image } from "@gluestack-ui/themed";
import { Button } from "../../atoms/Button";
import { ICONS } from "../../../data/icons";
import { displayDate } from "../../../utils/displayDate";

interface ISymptomCardProps {
  label: string;
  severityType: ISeverityType;
  imageUri: string;
  targetDate: Date;
  handleOnDelete: () => void;
  handleOnView: () => void;
}

export const SymptomCard = ({
  label,
  severityType,
  imageUri,
  targetDate,
  handleOnDelete,
  handleOnView,
}: ISymptomCardProps) => {
  return (
    <VStack
      borderColor={colors.gray}
      borderWidth="$1"
      borderRadius="$md"
      backgroundColor={colors.white}
      padding="$4"
      width="$full"
      hardShadow="5"
    >
      <HStack
        width="$full"
        justifyContent="space-between"
        alignItems="flex-start"
        minHeight="$10"
        marginBottom="$4"
      >
        <Image
          size="md"
          borderRadius={10}
          source={require("../../../../assets/symptom.jpg")}
          alt="Symptom Image"
        />
        <DeleteIcon handleOnPress={handleOnDelete} />
      </HStack>
      <VStack width="$full" space="sm">
        <VStack space="xs">
          <Text.Small bold>Symptom</Text.Small>
          <Text.Small>{label}</Text.Small>
        </VStack>

        <VStack space="xs">
          <HStack width="$full" alignItems="flex-end">
            <Text.Small bold>Severity Type </Text.Small>
            <Text.ExtraSmall>
              (Based on your Current Severity Rating)
            </Text.ExtraSmall>
          </HStack>
          <Text.Small>{severityType}</Text.Small>
        </VStack>

        <VStack space="xs">
          <Text.Small bold>Progress</Text.Small>
          <HStack>
            <Text.Small>
              You are Off-Target of completing your Target Severity rating,
              which is scheduled for the {displayDate(targetDate)}
            </Text.Small>
          </HStack>
        </VStack>

        <HStack width="$full" justifyContent="flex-end">
          <HStack style={{ width: 110 }}>
            <Button.Outline
              text="View"
              onPress={handleOnView}
              icon={ICONS.CHEVRON_RIGHT}
            ></Button.Outline>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

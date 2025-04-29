import { Image } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { Pressable } from "@gluestack-ui/themed";
import { validateOptionsBasedOnBoolean } from "../../../utils/validateOptionsBasedOnBoolean";

interface IAddSymptomCardProps {
  name: string;
  description: string;
  imageUri: string;
  isSelected: boolean;
  handleOnPress: () => void;
}

export const AddSymptomCard = ({
  name,
  description,
  imageUri,
  isSelected,
  handleOnPress,
}: IAddSymptomCardProps) => {
  const borderColor = validateOptionsBasedOnBoolean(
    isSelected,
    colors.sky_blue,
    colors.gray
  );
  const circleBorderColor = validateOptionsBasedOnBoolean(
    isSelected,
    colors.sky_blue,
    colors.black
  );
  const circleBackgroundColor = validateOptionsBasedOnBoolean(
    isSelected,
    colors.sky_blue,
    colors.white
  );

  return (
    <HStack
      borderColor={borderColor}
      borderWidth="$1"
      borderRadius="$md"
      backgroundColor={colors.white}
      padding="$4"
      width="$full"
      hardShadow="5"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image
        size="md"
        borderRadius={10}
        source={require("../../../../assets/symptom.jpg")}
        alt="Symptom Image"
      />

      <VStack space="xs" width={150}>
        <Text.Small bold>{name}</Text.Small>
        <Text.Small color="gray">{description}</Text.Small>
      </VStack>

      <Pressable
        p="$2"
        borderWidth="$1"
        borderRadius="$full"
        borderColor={circleBorderColor}
        backgroundColor={circleBackgroundColor}
        onPress={handleOnPress}
      >
        <></>
      </Pressable>
    </HStack>
  );
};

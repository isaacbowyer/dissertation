import { HStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { Text } from "../Text";

export const Banner = () => {
  return (
    <HStack
      position="relative"
      bg={colors.sky_blue}
      borderRadius="$xl"
      bottom="$4"
      left="$64"
      padding="$2"
      width="$16"
      justifyContent="center"
    >
      <Text.Small bold color="white">
        NEW
      </Text.Small>
    </HStack>
  );
};

import { Pressable, HStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "../Text";

interface IGoogleProps {
  handleOnPress: () => void;
}

export const GoogleButton = ({ handleOnPress }: IGoogleProps) => {
  return (
    <Pressable
      p="$2"
      backgroundColor={colors.sky_blue}
      borderRadius="$full"
      width="$full"
      borderColor={colors.sky_blue}
      onPress={handleOnPress}
    >
      <HStack width="$full" ml="$2">
        <HStack mr="$16">
          <Icon name="logo-google" size={20} color={colors.white} />
        </HStack>
        <Text.Regular color="white">Sign In With Google</Text.Regular>
      </HStack>
    </Pressable>
  );
};

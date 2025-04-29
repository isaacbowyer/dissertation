import { Icon, Pressable } from "@gluestack-ui/themed";
import { ICONS } from "../../../data/icons";
import { colors } from "../../../data/colors";

interface IDeleteIcon {
  handleOnPress: () => void;
}

export const DeleteIcon = ({ handleOnPress }: IDeleteIcon) => {
  return (
    <Pressable
      p="$2"
      borderWidth="$1"
      borderRadius="$full"
      borderColor={colors.sky_blue}
      onPress={handleOnPress}
    >
      <Icon as={ICONS.DELETE} size="lg" color={colors.sky_blue} />
    </Pressable>
  );
};

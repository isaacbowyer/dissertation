import { Icon, Pressable } from "@gluestack-ui/themed";
import { IColor } from "../../../entities/IColor";
import { colors } from "../../../data/colors";

interface IIconButtonProps {
  handleOnPress: () => void;
  icon: any;
  color?: IColor;
  isFilled?: boolean;
}

const Medium = ({
  handleOnPress,
  icon,
  color = "black",
  isFilled = false,
}: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon
        as={icon}
        size="md"
        color={colors[color]}
        fill={isFilled ? colors[color] : "#fff"}
      />
    </Pressable>
  );
};

const Large = ({
  handleOnPress,
  icon,
  color = "black",
  isFilled = false,
}: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon
        as={icon}
        size="lg"
        color={colors[color]}
        fill={isFilled ? colors[color] : "#fff"}
      />
    </Pressable>
  );
};

export const IconButton = {
  Medium,
  Large,
};

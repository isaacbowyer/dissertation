import { Pressable } from "@gluestack-ui/themed";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../Text";
import { IColor } from "../../../entities/IColor";

interface ILinkProps {
  screen: string;
  label: string;
  color?: IColor;
  bold?: boolean;
}

const SmallLink = ({ screen, label, color = "gray", bold }: ILinkProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Pressable onPress={() => navigation.navigate(screen)}>
      <Text.Small bold={bold} color={color}>
        {label}
      </Text.Small>
    </Pressable>
  );
};

const RegularLink = ({ screen, label, color = "gray", bold }: ILinkProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Pressable onPress={() => navigation.navigate(screen)}>
      <Text.Regular bold={bold} color={color}>
        {label}
      </Text.Regular>
    </Pressable>
  );
};

export const Link = {
  Regular: RegularLink,
  Small: SmallLink,
};

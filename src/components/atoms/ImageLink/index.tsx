import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IImageLinkProps {
  image: any;
  screen: string;
}

export const ImageLink = ({ image, screen }: IImageLinkProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Pressable onPress={() => navigation.navigate(screen)}>
      <Image source={image} height={160} width={140} alt="image-link" />
    </Pressable>
  );
};

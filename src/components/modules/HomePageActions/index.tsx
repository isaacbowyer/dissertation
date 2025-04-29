import { VStack } from "@gluestack-ui/themed";
import { Button } from "../../atoms/Button";
import { ICONS } from "../../../data/icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const HomePageActions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <VStack space="2xl">
      <Button.Solid
        text="Log In"
        onPress={() => navigation.navigate("Log In")}
      />
      <Button.Outline
        text="Create Account"
        onPress={() => navigation.navigate("Create Account")}
        icon={ICONS.ADD}
      />
    </VStack>
  );
};

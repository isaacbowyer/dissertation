import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { HorizitonalCard } from "../../components/modules/HorizontalCard";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICONS } from "../../data/icons";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";

export const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { state, methods } = useAuthenticationContext();

  return (
    <PrivateTemplateContainer
      mainSection={
        <VStack space="xl">
          <MainHeader title="Settings" isFetching={false} />

          <HorizitonalCard
            label="Personal Profile"
            buttonLabel="View"
            description="Change your account perferences"
            image={require("../../../assets/personal-profile.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => navigation.navigate("Personal Profile")}
          />

          <HorizitonalCard
            label="Notifications"
            buttonLabel="View"
            description="Manage your incoming notifications"
            image={require("../../../assets/notifications.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => navigation.navigate("Notifications")}
          />

          <HorizitonalCard
            label="Logout"
            buttonLabel="Logout"
            description="Leave the application"
            image={require("../../../assets/logout.png")}
            handleOnPress={() => methods.handleLogout()}
            isLoading={state.isLoading}
          />
        </VStack>
      }
    />
  );
};

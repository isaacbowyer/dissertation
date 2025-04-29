import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { HorizitonalCard } from "../../components/modules/HorizontalCard";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICONS } from "../../data/icons";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";
import { UI } from "../../data/ui";
import { IWorkResource } from "../../entities/IWorkResource";

export const WorkResourcesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { setCurrentWorkResource } = useCurrentEntityContext();

  const handleOnView = (resource: IWorkResource) => {
    setCurrentWorkResource(resource);
    navigation.navigate("Work Resource");
  };

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title="Work Resources" isFetching={false} />

          {UI.WORK_RESOURCES?.map((resource) => (
            <HorizitonalCard
              key={resource.label}
              label={resource.label}
              buttonLabel="View"
              description={resource.description}
              image={resource.image}
              icon={ICONS.CHEVRON_RIGHT}
              handleOnPress={() => handleOnView(resource)}
            />
          ))}
        </VStack>
      }
    />
  );
};

import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";

export const PersonalProfileScreen = () => {
  return (
    <PrivateTemplateContainer
      mainSection={
        <VStack space="xl">
          <MainHeader title="Personal Profile" isFetching={false} />
        </VStack>
      }
    />
  );
};

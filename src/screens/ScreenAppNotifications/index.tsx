import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";

export const NotificationsScreen = () => {
  return (
    <PrivateTemplateContainer
      mainSection={
        <VStack space="xl">
          <MainHeader title="Notifications" isFetching={false} />
        </VStack>
      }
    />
  );
};

import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { NotificationsSection } from "./components/NotificationsSection";
import { useNotificationsContext } from "../../contexts/useNotificationContext";

export const NotificationsScreen = () => {
  const { state, methods } = useNotificationsContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title={state?.title} isFetching={state?.isFetching} />

          <NotificationsSection
            totalPages={state?.totalPages}
            currentPage={state?.currentPage}
            count={state?.count}
            limit={state?.limit}
            screenState={state?.screenState}
            notifications={state?.notifications}
            isFetching={state?.isFetching}
            tagList={state?.tagList}
            source={state?.activeSource}
            handleOnRemove={methods?.handleOnDelete}
            handleOnMarkAsReadOrUnread={methods?.handleOnRead}
            handleOnChange={methods?.handleOnChange}
          />
        </VStack>
      }
    />
  );
};

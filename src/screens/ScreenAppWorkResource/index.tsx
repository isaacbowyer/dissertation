import { HStack, VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { WorkResourcesProvider, useWorkResourceContext } from "./context";
import { Text } from "../../components/atoms/Text";
import { Image } from "@gluestack-ui/themed";
import { WorkResourcesSection } from "./components/WorkResourcesSection";

const WorkResources = () => {
  const { state, methods } = useWorkResourceContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl" marginBottom="$2">
          <VStack space="xs">
            <MainHeader
              title={`Work Resource - ${state?.currentResource?.label}`}
              isFetching={state?.isFetching}
            />

            <HStack width="$full" alignItems="center" space="lg">
              <HStack width={200}>
                <Text.Regular color="gray">
                  {state?.currentResource?.description}
                </Text.Regular>
              </HStack>

              <Image
                size="lg"
                borderRadius={10}
                source={state?.currentResource?.image}
                alt="Work Resource Card Image"
              />
            </HStack>
          </VStack>

          <WorkResourcesSection
            totalPages={state?.totalPages}
            currentPage={state?.currentPage}
            count={state?.count}
            limit={state?.limit}
            numberOfUsers={state?.numberOfUsers}
            resources={state?.resources}
            isFetching={state?.isFetching}
            screenState={state?.screenState}
            tagList={state?.tagList}
            source={state.activeSource}
            types={state?.resourceTypes}
            handleOnChange={methods.handleOnChange}
            handleOnLike={methods.handleOnLike}
            handleOnView={methods.handleOnView}
            title={state?.currentResource?.label}
          />
        </VStack>
      }
    />
  );
};

export const WorkResourceScreen = ({ navigation }) => {
  return (
    <WorkResourcesProvider>
      <WorkResources />
    </WorkResourcesProvider>
  );
};

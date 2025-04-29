import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { HomePageActions } from "../../components/modules/HomePageActions";

export const HomeScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      mainSection={
        <VStack>
          <VStack marginBottom={"$20"}>
            <Text.Regular textAlign="center" color="gray" bold>
              Self-manage your Long-COVID Symptoms for a smoother reintegration
              to the workplace
            </Text.Regular>
          </VStack>

          <HomePageActions />
        </VStack>
      }
    />
  );
};

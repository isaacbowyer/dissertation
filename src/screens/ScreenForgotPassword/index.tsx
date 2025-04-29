import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { Button } from "../../components/atoms/Button";
import { Link } from "../../components/atoms/Link";
import { ForgotPasswordProvider, useForgotPasswordContext } from "./context";
import { Input } from "../../components/atoms/Input";
import { ICONS } from "../../data/icons";

const ForgotPassword = () => {
  const { state, methods } = useForgotPasswordContext();
  return (
    <PublicTemplateContainer
      mainSection={
        <VStack space="md">
          <VStack space="xs" marginBottom="$4">
            <Text.Header color="sky_blue">Send Reset Password Link</Text.Header>

            <Text.Regular color="gray">
              Instructions on how to reset your password will be sent via email
            </Text.Regular>
          </VStack>

          <Input
            label="Email"
            value={state.email}
            helpText={state.validationError}
            icon={ICONS.EMAIL}
            onChange={(e) => methods.handleOnChange(e.nativeEvent.text)}
          />

          <Button.Solid
            text="Send Reset Password Email"
            onPress={methods.handleSubmit}
            isDisabled={state.isDisabled}
            isLoading={state.isLoading}
          />

          <VStack alignItems="center" justifyContent="center" mb="$4">
            <Link.Regular label="Return to Home" screen="Home"></Link.Regular>
          </VStack>
        </VStack>
      }
    />
  );
};

export const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <ForgotPasswordProvider>
      <ForgotPassword />
    </ForgotPasswordProvider>
  );
};

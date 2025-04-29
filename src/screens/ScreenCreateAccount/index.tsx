import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { PersonalDetails } from "../../components/organisms/PersonalDetails";
import { PasswordDetails } from "../../components/organisms/PasswordDetails";
import { CompanyDetails } from "../../components/organisms/CompanyDetails";
import { Link } from "../../components/atoms/Link";
import { Button } from "../../components/atoms/Button";
import { CreateAccountProvider, useCreateAccountContext } from "./context";

const CreateAccount = () => {
  const { state, methods } = useCreateAccountContext();

  return (
    <PublicTemplateContainer
      scrollable
      mainSection={
        <VStack space="md">
          <Text.Header color="sky_blue">Create Account</Text.Header>

          <PersonalDetails
            firstName={state.values.firstName}
            lastName={state.values.lastName}
            email={state.values.email}
            date={state.values.birthDate}
            gender={state.values.gender}
            firstNameError={state.validationError.firstName}
            lastNameError={state.validationError.lastName}
            emailError={state.validationError.email}
            genderOptions={state.genderOptions}
            handleOnChange={methods.handleOnChange}
          />

          <PasswordDetails
            password={state.values.password}
            confirmPassword={state.values.confirmPassword}
            passwordError={state.validationError.password}
            confirmPasswordError={state.validationError.confirmPassword}
            handleOnChange={methods.handleOnChange}
          />

          <CompanyDetails
            name={state.values.companyName}
            country={state.values.country}
            industry={state.values.industry}
            nameError={state.validationError.companyName}
            countryOptions={state.countryOptions}
            industryOptions={state.industryOptions}
            handleOnChange={methods.handleOnChange}
          />

          <Button.Solid
            text="Create Account"
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

export const CreateAccountScreen = ({ navigation }) => {
  return (
    <CreateAccountProvider>
      <CreateAccount />
    </CreateAccountProvider>
  );
};

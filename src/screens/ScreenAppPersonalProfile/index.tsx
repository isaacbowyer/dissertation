import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { PersonalProfileProvider, usePersonalProfile } from "./context";
import { PersonalDetails } from "../../components/organisms/PersonalDetails";
import { PasswordDetails } from "../../components/organisms/PasswordDetails";
import { CompanyDetails } from "../../components/organisms/CompanyDetails";
import { Button } from "../../components/atoms/Button";

const PersonalProfile = () => {
  const { state, methods } = usePersonalProfile();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title="Personal Profile" isFetching={state?.isFetching} />

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
            text="Edit Account"
            onPress={methods.handleSubmit}
            isDisabled={state.isDisabled}
            isLoading={state.isLoading}
          />
        </VStack>
      }
    />
  );
};

export const PersonalProfileScreen = () => {
  return (
    <PersonalProfileProvider>
      <PersonalProfile />
    </PersonalProfileProvider>
  );
};

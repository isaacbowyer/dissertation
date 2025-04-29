import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { DatePicker } from "../../../../components/atoms/DatePicker";
import { Select } from "../../../../components/atoms/Select";
import { ICONS } from "../../../../data/icons";
import { IOption } from "../../../../entities/IOption";
import { ICreateAccountStateKey } from "../../../../entities/ICreateAccountStateKey";
import { ICreateAccountStateKeyValue } from "../../../../entities/ICreateAccountStateKeyValue";

interface IPersonalDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
  gender: IOption;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  genderOptions: IOption[];
  handleOnChange: (
    key: ICreateAccountStateKey,
    value: ICreateAccountStateKeyValue
  ) => void;
}

export const PersonalDetails = ({
  firstName,
  lastName,
  email,
  date,
  gender,
  firstNameError,
  lastNameError,
  emailError,
  genderOptions,
  handleOnChange,
}: IPersonalDetailsProps) => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">1. Personal Details</Text.Regular>

      <Input
        label="First Name"
        value={firstName}
        helpText={firstNameError}
        onChange={(e) => handleOnChange("firstName", e.nativeEvent.text)}
      />

      <Input
        label="Last Name"
        value={lastName}
        helpText={lastNameError}
        onChange={(e) => handleOnChange("lastName", e.nativeEvent.text)}
      />

      <DatePicker
        label="Date of Birth"
        date={date}
        onChange={(event, newDate) => handleOnChange("birthDate", newDate)}
        maxDate={new Date()}
      />

      <Select
        selectedOption={gender}
        label="Gender"
        items={genderOptions}
        onChange={(value) => handleOnChange("gender", value)}
      />

      <Input
        label="Email"
        value={email}
        helpText={emailError}
        icon={ICONS.EMAIL}
        onChange={(e) => handleOnChange("email", e.nativeEvent.text)}
      />
    </VStack>
  );
};

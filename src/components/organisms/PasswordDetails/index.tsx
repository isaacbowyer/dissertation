import { VStack } from "@gluestack-ui/themed";
import { InputPassword } from "../../atoms/InputPassword";
import { Text } from "../../atoms/Text";
import { IPersonalAccountStateKeyValue } from "../../../entities/IPersonalAccountStateKeyValue";
import { IPersonalAccountStateKey } from "../../../entities/IPersonalAccountStateKey";

interface IPasswordDetailsProps {
  password: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  handleOnChange: (
    key: IPersonalAccountStateKey,
    value: IPersonalAccountStateKeyValue
  ) => void;
}

export const PasswordDetails = ({
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  handleOnChange,
}: IPasswordDetailsProps) => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">2. Password Details</Text.Regular>

      <InputPassword
        label="Password"
        value={password}
        helpText={passwordError}
        onChange={(e) => handleOnChange("password", e.nativeEvent.text)}
      />

      <InputPassword
        label="Confirm Password"
        value={confirmPassword}
        helpText={confirmPasswordError}
        onChange={(e) => handleOnChange("confirmPassword", e.nativeEvent.text)}
      />
    </VStack>
  );
};

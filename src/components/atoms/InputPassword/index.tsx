import { InputField, InputIcon, VStack } from "@gluestack-ui/themed";
import { Input as GluestackInput } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { ICONS } from "../../../data/icons";
import { FormControl } from "@gluestack-ui/themed";
import { LabelError } from "../LabelError";
import { Label } from "../Label";

interface IInputPasswordProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  isDisabled?: boolean;
  helpText?: string;
}

export const InputPassword = ({
  label,
  value,
  onChange,
  helpText,
  isDisabled = false,
}: IInputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!helpText) {
      setIsTouched(false);
      return;
    }
  }, [isTouched]);

  const handleOnChange = (e) => {
    setIsTouched(true);
    onChange(e);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isTouchedAndHasHelpText = isTouched && helpText;

  return (
    <VStack space="xs">
      <FormControl isDisabled={isDisabled} isInvalid={!!helpText}>
        <Label>{label}</Label>

        <GluestackInput variant="underlined">
          <InputField
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={handleOnChange}
          />

          <InputSlot pr="$3" onPress={handleShowPassword}>
            <InputIcon as={showPassword ? ICONS.EYE : ICONS.EYE_OFF} />
          </InputSlot>
        </GluestackInput>

        {isTouchedAndHasHelpText && <LabelError>{helpText}</LabelError>}
      </FormControl>
    </VStack>
  );
};

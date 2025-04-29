import {
  FormControl,
  InputField,
  InputIcon,
  VStack,
} from "@gluestack-ui/themed";
import { Input as GluestackInput } from "@gluestack-ui/themed";
import { Label } from "../Label";
import { InputSlot } from "@gluestack-ui/themed";
import { LabelError } from "../LabelError";
import { useEffect, useState } from "react";

interface IInputProps {
  label: string;
  value: string;
  type?: "underlined" | "rounded" | "outline";
  onChange?: (e: any) => void;
  isDisabled?: boolean;
  icon?: any;
  helpText?: string;
  placeholder?: string;
}

export const Input = ({
  label,
  value,
  onChange,
  icon,
  helpText,
  isDisabled = false,
  type = "underlined",
  placeholder = "",
}: IInputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleOnChange = (e) => {
    setIsTouched(true);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (!helpText) {
      setIsTouched(false);
      return;
    }
  }, [isTouched]);

  const isTouchedAndHasHelpText = isTouched && helpText;

  return (
    <VStack space="xs">
      <FormControl isReadOnly={isDisabled} isInvalid={!!helpText}>
        {!placeholder ? <Label>{label}</Label> : null}

        <GluestackInput variant={type} size="sm">
          <InputField
            type="text"
            value={value}
            onChange={handleOnChange}
            placeholder={placeholder}
          />

          {icon && (
            <InputSlot pr="$3">
              <InputIcon as={icon} />
            </InputSlot>
          )}
        </GluestackInput>

        {isTouchedAndHasHelpText && <LabelError>{helpText}</LabelError>}
      </FormControl>
    </VStack>
  );
};

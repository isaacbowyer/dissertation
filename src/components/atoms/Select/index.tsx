import {
  FormControl,
  Select as GluestackSelect,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectScrollView,
  Icon,
} from "@gluestack-ui/themed";
import { ICONS } from "../../../data/icons";
import { IOption } from "../../../entities/IOption";
import { useState, useEffect } from "react";
import { Label } from "../Label";
import { LabelError } from "../LabelError";
import { SelectFlatList } from "@gluestack-ui/themed";
import { getOptionNameFromId } from "../../../utils/getOptionNameFromId";

interface ISelectProps {
  selectedOption: IOption;
  label: string;
  items: IOption[];
  isDisabled?: boolean;
  helpText?: string;
  onChange: (value: IOption) => void;
}

export const Select = ({
  onChange,
  selectedOption,
  label,
  items,
  isDisabled = false,
  helpText,
}: ISelectProps) => {
  const defaultValue = selectedOption?.name;

  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!helpText) {
      setIsTouched(false);
      return;
    }
  }, [isTouched]);

  const isTouchedAndHasHelpText = isTouched && helpText;

  const _handleOnChange = (value: string) => {
    const selectedName = getOptionNameFromId(items, +value);
    onChange({ id: +value, name: selectedName });
  };

  return (
    <FormControl isReadOnly={isDisabled} isInvalid={!!helpText}>
      <Label>{label}</Label>
      <GluestackSelect
        selectedValue={defaultValue}
        onValueChange={_handleOnChange}
      >
        <SelectTrigger variant="underlined" size="sm">
          <SelectInput placeholder="Select" />
          <SelectIcon mr="$3">
            <Icon as={ICONS.CHEVRON_DOWN} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectScrollView maxHeight="200px">
              {items.map((item) => (
                <SelectItem
                  label={item.name}
                  value={item.id.toString()}
                  key={item.id}
                />
              ))}
            </SelectScrollView>
          </SelectContent>
        </SelectPortal>
      </GluestackSelect>
      {isTouchedAndHasHelpText && <LabelError>{helpText}</LabelError>}
    </FormControl>
  );
};

import { FormControlErrorIcon } from "@gluestack-ui/themed";
import { FormControlErrorText } from "@gluestack-ui/themed";
import { FormControlError } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { ICONS } from "../../../data/icons";

interface ILabelErrorProps {
  children: ReactNode;
}

export const LabelError = ({ children }: ILabelErrorProps) => {
  return (
    <FormControlError>
      <FormControlErrorIcon as={ICONS.ALERT} />
      <FormControlErrorText>{children}</FormControlErrorText>
    </FormControlError>
  );
};

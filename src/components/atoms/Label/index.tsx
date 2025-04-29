import { FormControlLabelText } from "@gluestack-ui/themed";
import { FormControlLabel } from "@gluestack-ui/themed";
import { ReactNode } from "react";

interface ILabelProps {
  children: ReactNode;
}

export const Label = ({ children }: ILabelProps) => {
  return (
    <FormControlLabel>
      <FormControlLabelText>{children}</FormControlLabelText>
    </FormControlLabel>
  );
};

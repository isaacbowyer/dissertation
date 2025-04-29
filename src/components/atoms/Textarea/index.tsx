import {
  FormControl,
  Textarea as GluestackTextarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { Label } from "../Label";

interface ITextareaProps {
  label: string;
  value: string;

  onChange?: (e: any) => void;
}

export const Textarea = ({ label, value, onChange }: ITextareaProps) => {
  return (
    <FormControl>
      <Label>{label}</Label>
      <GluestackTextarea size="sm">
        <TextareaInput
          value={value}
          onChange={onChange}
          placeholder="Type here..."
        />
      </GluestackTextarea>
    </FormControl>
  );
};

import { Input } from "../Input";
import { ICONS } from "../../../data/icons";
import { Pressable } from "@gluestack-ui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "../../../utils/formatDate";

interface IDatePicker {
  label: string;
  date: Date;
  onChange: (e: any, selectedDate: Date) => void;
  maxDate?: Date;
  minDate?: Date;
  isDisabled?: boolean;
}

export const DatePicker = ({
  label,
  date,
  onChange,
  maxDate,
  minDate,
  isDisabled = false,
}: IDatePicker) => {
  const formattedDate = !!date ? formatDate(date) : "";

  const showDatepicker = () => {
    if (isDisabled) return;
    DateTimePickerAndroid.open({
      value: !!date ? date : new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
      maximumDate: maxDate && maxDate,
      minimumDate: minDate && minDate,
    });
  };

  return (
    <Pressable onPress={showDatepicker}>
      <Input
        label={label}
        placeholder={"dd/mm/yyyy"}
        value={formattedDate}
        icon={ICONS.CALANDER}
        isDisabled={true}
      />
    </Pressable>
  );
};

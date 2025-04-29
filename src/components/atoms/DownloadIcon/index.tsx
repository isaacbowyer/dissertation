import { Pressable } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import Icon from "react-native-vector-icons/Ionicons";

interface IDownloadIcon {
  handleOnView: () => void;
}

export const DownloadIcon = ({ handleOnView }: IDownloadIcon) => {
  return (
    <Pressable onPress={handleOnView}>
      <Icon name="document-text-outline" size={40} color={colors.black} />
    </Pressable>
  );
};

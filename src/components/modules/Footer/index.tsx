import { HStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";

export const Footer = () => {
  <HStack width="$full" space="3xl">
    <Text.ExtraSmall color="gray">Terms and Conditons</Text.ExtraSmall>
    <Text.ExtraSmall color="gray">Data Protection</Text.ExtraSmall>
    <Text.ExtraSmall color="gray">Cookie Policy</Text.ExtraSmall>
  </HStack>;
};

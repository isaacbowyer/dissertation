import {
  VStack,
  HStack,
  ScrollView,
  KeyboardAvoidingView,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";
import { ImageLink } from "../../atoms/ImageLink";
import { Text } from "../../atoms/Text";
import { colors } from "../../../data/colors";

interface IPublicTemplateContainerProps {
  mainSection: ReactNode;
  scrollable?: boolean;
}

export const PublicTemplateContainer = ({
  mainSection,
  scrollable = false,
}: IPublicTemplateContainerProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <VStack
      flex={1}
      backgroundColor={colors.white}
      justifyContent="space-between"
      padding={"$4"}
    >
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={scrollable}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView behaviour="padding">
          <VStack alignItems="center" space="xs" marginBottom="$4">
            <ImageLink
              image={require("../../../../assets/logo.png")}
              screen="Home"
            />
            <HStack space="xs">
              <Text.Title>Open - OH</Text.Title>
              <Text.ExtraSmall bold>TM</Text.ExtraSmall>
            </HStack>
          </VStack>
          {mainSection}
        </KeyboardAvoidingView>
      </ScrollView>

      {!isKeyboardVisible && (
        <HStack width="$full" space="3xl">
          <Text.ExtraSmall color="gray">Terms and Conditons</Text.ExtraSmall>
          <Text.ExtraSmall color="gray">Data Protection</Text.ExtraSmall>
          <Text.ExtraSmall color="gray">Cookie Policy</Text.ExtraSmall>
        </HStack>
      )}
    </VStack>
  );
};

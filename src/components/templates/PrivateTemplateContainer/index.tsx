import { VStack, ScrollView, KeyboardAvoidingView } from "@gluestack-ui/themed";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";
import { colors } from "../../../data/colors";

interface IPrivateTemplateContainerProps {
  mainSection: ReactNode;
  scrollable?: boolean;
}

export const PrivateTemplateContainer = ({
  mainSection,
  scrollable = false,
}: IPrivateTemplateContainerProps) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <VStack
      flex={1}
      backgroundColor={colors.light_gray}
      justifyContent="space-between"
      padding={"$4"}
    >
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={scrollable}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView behaviour="padding">
          {mainSection}
        </KeyboardAvoidingView>
      </ScrollView>
    </VStack>
  );
};

import {
  Icon,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  Pressable,
} from "@gluestack-ui/themed";
import { useToast } from "@gluestack-ui/themed";
import { ICONS } from "../../data/icons";

const DEFAULT_DURATION = 3000;

export const useCustomToast = () => {
  const toast = useToast();

  const errorToast = (description: string) => {
    toast.show({
      placement: "top",
      duration: DEFAULT_DURATION,
      render: ({ id }) => {
        const toastId = `toast-${id}`;

        return (
          <Toast nativeID={toastId} action="error">
            <Icon as={ICONS.ALERT} color="$white" mt="$1" mr="$3" />
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
            <Pressable mt="$1" onPress={() => toast.close(id)}>
              <Icon as={ICONS.CLOSE} color="$white" />
            </Pressable>
          </Toast>
        );
      },
    });
  };

  const successToast = (description: string) => {
    toast.show({
      placement: "top",
      duration: DEFAULT_DURATION,
      render: ({ id }) => {
        const toastId = `toast-${id}`;

        return (
          <Toast nativeID={toastId} action="success">
            <Icon as={ICONS.CHECK} color="$white" mt="$1" mr="$3" />
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
            <Pressable mt="$1" onPress={() => toast.close(id)}>
              <Icon as={ICONS.CLOSE} color="$white" />
            </Pressable>
          </Toast>
        );
      },
    });
  };

  return { errorToast, successToast };
};

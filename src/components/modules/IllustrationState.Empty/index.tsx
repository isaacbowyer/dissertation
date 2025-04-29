import { Image, VStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";

interface IllustrationStateEmpty {
  message: string;
}

export const IllustrationStateEmpty = ({ message }: IllustrationStateEmpty) => {
  return (
    <VStack p="$8" w="$full" space="md" alignItems="center">
      <Image
        size="2xl"
        borderRadius={0}
        source={require("../../../../assets/no-files.png")}
        alt="No Items Image"
      />
      <Text.Regular textAlign="center" color="gray">
        {message}
      </Text.Regular>
    </VStack>
  );
};

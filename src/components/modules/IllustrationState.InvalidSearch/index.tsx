import { Image, VStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";

interface IllustrationStateInvalidSearch {
  loadWhat: string;
}

export const IllustrationInvalidSearch = ({
  loadWhat,
}: IllustrationStateInvalidSearch) => {
  return (
    <VStack p="$8" w="$full" space="md" alignItems="center">
      <Image
        size="2xl"
        borderRadius={0}
        source={require("../../../../assets/invalid-search.png")}
        alt="Invalid Search Image"
      />
      <Text.Regular textAlign="center" color="gray">
        There were no {loadWhat} that match your search critiea
      </Text.Regular>
    </VStack>
  );
};

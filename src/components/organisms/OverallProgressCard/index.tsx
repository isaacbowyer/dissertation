import { HStack, VStack } from "@gluestack-ui/themed";
import { ProgressBar } from "../../atoms/ProgressBar";
import { calculateProgressPercentage } from "../../../utils/calculateProgressPercentage";
import { Text } from "../../atoms/Text";
import { colors } from "../../../data/colors";

interface IOverallProgressCard {
  currentSeverity: number;
  targetSeverity: number;
  daysLeft: number;
}

export const OverallProgressCard = ({
  currentSeverity,
  targetSeverity,
  daysLeft,
}: IOverallProgressCard) => {
  // Calculate the progress percentage
  const progressPercentage = calculateProgressPercentage({
    targetSeverity: targetSeverity,
    currentSeverity: currentSeverity,
  });

  return (
    <VStack
      w="$full"
      padding="$2"
      space="sm"
      backgroundColor={colors.white}
      borderRadius="$lg"
      borderWidth={1}
    >
      <HStack w="$full" justifyContent="space-between" paddingHorizontal="$4">
        <VStack alignItems="center">
          <VStack alignItems="center">
            <Text.Small color="gray">Current</Text.Small>
            <Text.Small color="gray">Severity</Text.Small>
          </VStack>
          <Text.Header>{currentSeverity}</Text.Header>
        </VStack>
        <VStack alignItems="center">
          <VStack alignItems="center">
            <Text.Small color="gray">Target</Text.Small>
            <Text.Small color="gray">Severity</Text.Small>
          </VStack>
          <Text.Header>{targetSeverity}</Text.Header>
        </VStack>
        <VStack alignItems="center">
          <VStack alignItems="center">
            <Text.Small color="gray">Days</Text.Small>
            <Text.Small color="gray">Left</Text.Small>
          </VStack>
          <Text.Header>{daysLeft}</Text.Header>
        </VStack>
      </HStack>
      <ProgressBar value={progressPercentage} />
    </VStack>
  );
};

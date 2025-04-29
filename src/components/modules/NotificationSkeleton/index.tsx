import { HStack, VStack } from "@gluestack-ui/themed";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";
import { colors } from "../../../data/colors";
import { SkeletonText } from "../../atoms/SkeletonText";

export const NotificationSkeleton = () => {
  return (
    <SkeletonContainer>
      <VStack width="$full">
        <HStack
          width="$full"
          padding="$2"
          borderColor={colors.gray}
          borderWidth="$1"
          backgroundColor={colors.white}
          hardShadow="5"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space="sm" alignItems="center">
            <Skeleton
              style={{
                height: 70,
                width: 70,
              }}
            />

            <VStack space="xs" width={160}>
              <SkeletonText width={160} />

              {[140, 140, 100].map((item, index) => (
                <SkeletonText key={index} width={item} />
              ))}
            </VStack>
          </HStack>

          <Skeleton
            style={{
              height: 40,
              width: 20,
            }}
          />
        </HStack>
      </VStack>
      <HStack
        position="relative"
        bg={colors.charkcoal}
        borderRadius="$xl"
        bottom="$8"
        left="$64"
        padding="$2"
        width="$16"
        justifyContent="center"
      >
        <SkeletonText width={20} />
      </HStack>
    </SkeletonContainer>
  );
};

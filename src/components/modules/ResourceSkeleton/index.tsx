import { HStack, VStack } from "@gluestack-ui/themed";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";
import { colors } from "../../../data/colors";
import { SkeletonText } from "../../atoms/SkeletonText";

export const ResourceSkeleton = () => {
  return (
    <SkeletonContainer>
      <VStack
        width="$full"
        padding="$4"
        borderColor={colors.gray}
        borderWidth="$1"
        backgroundColor={colors.white}
        hardShadow="5"
      >
        {/* HEADER */}
        <HStack
          width="$full"
          space="lg"
          alignItems="flex-start"
          minHeight="$10"
          marginBottom="$4"
        >
          <Skeleton
            style={{
              height: 80,
              width: 80,
              borderRadius: 5,
            }}
          />

          {/* COMPANY NAME & DESCRIPTION */}
          <VStack space="xs" width={150}>
            <SkeletonText width={90} />

            {[130, 80].map((item, index) => (
              <SkeletonText key={index} width={item} />
            ))}
          </VStack>

          <Skeleton
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />
        </HStack>

        <VStack width="$full" space="sm">
          {/* RESOURCE TYPE */}
          <VStack space="xs">
            <SkeletonText width={90} />

            <SkeletonText width={65} />
          </VStack>

          {/* RESOURCE INFOMATION */}
          <VStack space="xs">
            <SkeletonText width={120} />

            {[290, 290, 80].map((item, index) => (
              <SkeletonText key={index} width={item} />
            ))}
          </VStack>

          {/* FAVOURITE INDICATOR */}
          <VStack space="xs">
            <SkeletonText width={130} />
            <SkeletonText width={240} />
          </VStack>

          {/* BUTTON */}
          <HStack width="$full" justifyContent="flex-end">
            <Skeleton
              style={{
                height: 40,
                width: 200,
                borderRadius: 25,
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </SkeletonContainer>
  );
};

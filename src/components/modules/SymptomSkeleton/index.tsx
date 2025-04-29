import { HStack, VStack } from "@gluestack-ui/themed";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";
import { colors } from "../../../data/colors";
import { SkeletonText } from "../../atoms/SkeletonText";

export const SymptomSkeleton = () => {
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
          justifyContent="space-between"
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
          <Skeleton
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />
        </HStack>

        <VStack width="$full" space="sm">
          {/* SYMPTOM NAME */}
          <VStack space="xs">
            <SkeletonText />

            <SkeletonText width={180} />
          </VStack>

          {/* SEVERITY TYPE */}
          <VStack space="xs">
            <HStack space="xs" alignItems="flex-end">
              <SkeletonText width={90} />
              <SkeletonText height={15} width={170} />
            </HStack>

            <SkeletonText width={60} />
          </VStack>

          {/* PROGRESS */}
          <VStack space="xs">
            <SkeletonText />
            {[290, 290, 80].map((item, index) => (
              <SkeletonText key={index} width={item} />
            ))}
          </VStack>

          {/* BUTTON */}
          <HStack width="$full" justifyContent="flex-end">
            <Skeleton
              style={{
                height: 40,
                width: 110,
                borderRadius: 25,
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </SkeletonContainer>
  );
};

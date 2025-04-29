import { HStack, VStack } from "@gluestack-ui/themed";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";

interface ISubHeaderWithTagsSkeletonProps {
  tags: string[];
}
export const SubHeaderWithTagsSkeleton = ({
  tags,
}: ISubHeaderWithTagsSkeletonProps) => {
  return (
    <SkeletonContainer>
      <VStack marginTop="$1" space="md">
        <HStack width="$full" space="md" flexWrap="wrap">
          {tags.map((tag) => (
            <Skeleton
              key={tag}
              style={{
                height: 24,
                width: 90,
              }}
            />
          ))}
        </HStack>
        <HStack width="$full" justifyContent="space-between" minHeight="$10">
          <Skeleton
            style={{
              height: 21,
              width: 178,
            }}
          />
          <Skeleton
            style={{
              height: 21,
              width: 70,
            }}
          />
        </HStack>
      </VStack>
    </SkeletonContainer>
  );
};

import { HStack } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";

interface IHeaderWithSearchSkeletonProps {
  action: ReactNode;
}
export const HeaderWithSearchSkeleton = ({
  action,
}: IHeaderWithSearchSkeletonProps) => {
  return (
    <SkeletonContainer>
      <HStack width="$full" justifyContent="space-between" mb="$1">
        <Skeleton
          style={{
            height: 30,
            width: 220,
          }}
        />
        {action}
      </HStack>
    </SkeletonContainer>
  );
};

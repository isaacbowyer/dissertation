import { Skeleton } from "react-native-skeleton-component";

interface ISkeletonText {
  width?: number;
  height?: number;
}

export const SkeletonText = ({ width = 70, height = 20 }: ISkeletonText) => {
  return (
    <Skeleton
      style={{
        height,
        width,
      }}
    />
  );
};

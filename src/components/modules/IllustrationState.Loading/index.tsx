import { VStack } from "@gluestack-ui/themed";
import { NotificationSkeleton } from "../NotificationSkeleton";
import { ResourceSkeleton } from "../ResourceSkeleton";
import { SymptomSkeleton } from "../SymptomSkeleton";

type ISkeletonType = "symptom" | "resource" | "notification";

interface ILoadingWithSkeletonProps {
  skeletonType: ISkeletonType;
}

const SkeletonCardFactory = {
  resource: ResourceSkeleton,
  symptom: SymptomSkeleton,
  notification: NotificationSkeleton,
};

const cards = [1, 2];

export const IllustrationStateLoading = ({
  skeletonType,
}: ILoadingWithSkeletonProps) => {
  const Card = SkeletonCardFactory[skeletonType];

  return (
    <VStack space="md" mb="$8">
      {cards.map((card, index) => (
        <Card key={card} data-testid={`skeleton-card-${index + 1}`} />
      ))}
    </VStack>
  );
};

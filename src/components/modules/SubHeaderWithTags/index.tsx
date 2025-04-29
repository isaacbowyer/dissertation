import { HStack, VStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { SubHeaderWithTagsSkeleton } from "../SubHeaderWithTagsSkeleton";
import { Tags } from "../Tags";

interface ISubHeaderProps {
  pageCount?: number;
  currentPage?: number;
  entriesCount?: number;
  currentEntries?: number;
  tagList: string[];
  activeSource: string;
  isFetching: boolean;
  label: string;
  handleOnChange: (source: string) => void;
}

export const SubHeaderWithTags = ({
  pageCount = 1,
  currentPage = 1,
  entriesCount = 0,
  currentEntries = entriesCount,
  tagList,
  activeSource,
  isFetching,
  label,
  handleOnChange,
}: ISubHeaderProps) => {
  if (isFetching) {
    return <SubHeaderWithTagsSkeleton tags={tagList} />;
  }

  const formattedEntitesCount = currentEntries ? entriesCount : 0;
  const formattedPageCount = pageCount || 1;

  return (
    <VStack space="md">
      <Tags
        tagList={tagList}
        active={activeSource}
        handleSetActive={handleOnChange}
      />
      <HStack width="$full" justifyContent="space-between" height="$10">
        <Text.Small color="sky_blue">
          Displaying {currentEntries} of {formattedEntitesCount} {label}
        </Text.Small>
        <Text.Small color="sky_blue">
          Page {currentPage} of {formattedPageCount}
        </Text.Small>
      </HStack>
    </VStack>
  );
};

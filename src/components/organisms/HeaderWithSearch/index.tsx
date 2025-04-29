import { formatTitleWithCount } from "../../../utils/formatTitleWithCount";
import { SearchAction } from "../../modules/SearchAction";
import { HStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { HeaderWithSearchSkeleton } from "../HeaderWithSearchSkeleton";

interface IHeaderWithSearchProps {
  title: string;
  count: number;
  isFetching: boolean;
  search: {
    isSearchActive: boolean;
    handleOnSearch: () => void;
  };
}

export const HeaderWithSearch = ({
  title,
  count,
  isFetching,
  search,
}: IHeaderWithSearchProps) => {
  const formattedTitle = formatTitleWithCount(title, count);

  if (isFetching) {
    return (
      <HeaderWithSearchSkeleton
        action={
          <SearchAction
            isSearchActive={search.isSearchActive}
            handleOnSearch={search.handleOnSearch}
          />
        }
      />
    );
  }

  return (
    <HStack
      width="$full"
      justifyContent="space-between"
      alignItems="center"
      mb="$1"
    >
      <Text.SubHeader bold color="sky_blue">
        {formattedTitle}
      </Text.SubHeader>
      <SearchAction
        isSearchActive={search.isSearchActive}
        handleOnSearch={search.handleOnSearch}
      />
    </HStack>
  );
};
